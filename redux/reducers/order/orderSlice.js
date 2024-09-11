import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrderSlip } from "./orderApi";

const initialState = {
  isLoading: false,
  carId: null,
  dataOrder: {},
  currentStep: 0,
  paymentCountdown: null,
  selectedBank: null,
  promo: null,
  verificationCountdown: null,
  errorMessage: null,
  isError: false,
  isModalVisible: false,
  status: "pending"
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetState: (state) => {
      state.dataOrder = {}
      state.currentStep = 0
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataOrder = action.payload;
      state.status = "success";
      // state.isModalVisible = true;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true;
      state.errorMessage = action.payload
      state.status = "error";
      // state.isModalVisible = true;
    });

    builder.addCase(putOrderSlip.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataOrder = action.payload;
      state.status = "upload-success";
      // state.isModalVisible = true;
    });
    builder.addCase(putOrderSlip.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true;
      state.errorMessage = action.payload
      state.status = "upload-error";
      // state.isModalVisible = true;
    });
  },
});

export const postOrders = postOrder;
export const putOrderSlips = putOrderSlip;
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;
