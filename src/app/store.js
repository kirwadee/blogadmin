import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
  devTools: false,
});
