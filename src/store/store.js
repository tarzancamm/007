import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; //Can be named anything bc it is the default export of auth.js

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;