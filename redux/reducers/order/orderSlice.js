import { createSlice } from "@reduxjs/toolkit";
import { postOrder, postOrderSlip } from "./orderApi";

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
      state = initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataOrder = action.payload;
      // state.isModalVisible = true;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false
      // state.isError = true;
      state.errorMessage = action.payload
      // state.isModalVisible = true;
    });

    builder.addCase(postOrderSlip.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      // state.isModalVisible = true;
    });
    builder.addCase(postOrderSlip.rejected, (state, action) => {
      state.isLoading = false
      // state.isError = true;
      state.errorMessage = action.payload
      // state.isModalVisible = true;
    });
  },
});

export const postOrders = postOrder;
export const postOrderSlips = postOrderSlip;
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;
