import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/auth/authSlice";
import modalReducer from "../fetures/modal/modalSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
