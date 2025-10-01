import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const reducer = {
    user: userReducer,
}
export const store = configureStore({
    reducer,
});