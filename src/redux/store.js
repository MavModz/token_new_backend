import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import mobileNumberReducer from "./reducer/mobileNumberReducer.js";

// Create the logger instance
const logger = createLogger();

// Configure the store
const store = configureStore({
  reducer: {
    mobileNumber: mobileNumberReducer,
  },
  middleware: [logger],
});

export default store;
