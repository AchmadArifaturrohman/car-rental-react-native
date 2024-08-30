import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import { newCar } from "./reducers/car/carSlice";
import { newCarDetails } from "./reducers/car/carDetailsSlice";
import { newAuthLogin } from "./reducers/auth/authSlice";

export const store = configureStore({
  reducer: {
    car: newCar,
    carDetails: newCarDetails,
    login: newAuthLogin,
  },
  enhancers: (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers().concat(reactotron.createEnhancer())
      : getDefaultEnhancers(),
});