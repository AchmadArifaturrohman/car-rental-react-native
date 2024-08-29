// Penghubung Component dengan Store

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("car/fetchCars", async (signal) => {
    const response = await fetch("https://api-car-rental.binaracademy.org/customer/car/", { signal: signal });
    return response?.json();
});

export const fetchCarsDetails = createAsyncThunk("car/fetchCarsDetails", async ({id, signal}) => {
    const response = await fetch(`https://api-car-rental.binaracademy.org/customer/car/${id}`, { signal: signal });
    return response?.json();
});

