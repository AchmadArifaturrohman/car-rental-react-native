import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./carApi";

// Create a slice for managing car-related state
const carSlice = createSlice({
    name: "car",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        // Handle pending state when fetching cars
        builder.addCase(fetchCars.pending, (state, action) => {
            state.isLoading = true;
        });
        // Handle successful fetch of cars
        builder.addCase(fetchCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        // Handle error state when fetching cars fails
        builder.addCase(fetchCars.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    },
});

// Export the action for fetching cars
export const getCar = fetchCars;
// Selector functions to access the car state from the Redux store
export const selectCar = state => state.car;
// Export the reducers
export const newCar = carSlice.reducer;