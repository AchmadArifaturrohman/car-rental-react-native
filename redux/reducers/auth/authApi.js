import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk("auth/authLogin", async (formData, {rejectWithValue}) => {

     try {
        const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const body = await response?.json();
      if(!response.ok) throw new Error(body.message);
      return body;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});