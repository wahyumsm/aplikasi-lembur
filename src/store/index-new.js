import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth-new";

export const store = configureStore({
  reducer: {
    auth: auth,
  },
});
