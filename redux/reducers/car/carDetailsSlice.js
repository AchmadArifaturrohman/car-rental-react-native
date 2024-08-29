import { createSlice } from "@reduxjs/toolkit";
import { fetchCarsDetails } from "./carApi";

const carDetailsSlice = createSlice({
    name: "carDetails",
    initialState: {
        isLoading: false,
        data: {},
        isError: false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        // Handle pending state when fetching cars
        builder.addCase(fetchCarsDetails.pending, (state, action) => {
            state.isLoading = true;
        });
        // Handle successful fetch of cars
        builder.addCase(fetchCarsDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        // Handle error state when fetching cars fails
        builder.addCase(fetchCarsDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    },
});

export const getCarDetails = fetchCarsDetails;
export const selectCarDetails = state => state.carDetails;
export const newCarDetails = carDetailsSlice.reducer;