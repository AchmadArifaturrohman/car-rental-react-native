import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import { newCar } from "./reducers/car/carSlice";
import { newCarDetails } from "./reducers/car/carDetailsSlice";

export const store = configureStore({
    reducer: {
    car: newCar,
    carDetails: newCarDetails,
  },
  enhancers: (getDefaultEnhancers) =>
    __DEV__ ? getDefaultEnhancers().concat(reactotron.createEnhancer()) : getDefaultEnhancers(),
});