import { createAsyncThunk } from "@reduxjs/toolkit";

export const postOrder = createAsyncThunk("order/postOrder", async ({token, formData}, {rejectWithValue}) => {
        console.log("formData", formData);
        console.log("token", token)
     try {
        
        const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_token": token
          },
          body: JSON.stringify({
            "car_id": formData.carId,
            "start_rent_at": formData.startRentAt,
            "finish_rent_at": formData.finishRentAt,
          }),
        }
      );
      const body = await response?.json();
      if(!response.ok) throw new Error(body.message);
      console.log("body", body)
      return body;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const postOrderSlip = createAsyncThunk("order/postOrderSlip", async ({token, id, formData}, {rejectWithValue}) => {

     try {
        const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order" + id + "/slip",
        {
          method: "PUT",
          headers: {
            "access_token": token
          },
          body: formData,
        }
      );
      const body = await response?.json();
      if(!response.ok) throw new Error(body.message);
      return body;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});