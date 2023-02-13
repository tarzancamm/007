import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; //Can be named anything bc it is the default export of auth.js
import listReducer from './lists' //Can be named anything bc it is the default export of auth.js

const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer
  },
});

export default store;