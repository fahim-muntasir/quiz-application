import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/auth/authSlice";
import filterReducer from "../fetures/filter/filterSlice";
import modalReducer from "../fetures/modal/modalSlice";
import quizReducer from "../fetures/quiz/quizSlice";
import quizAnsReducer from "../fetures/quizAnswer/quizAnsSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        quiz: quizReducer,
        quizAnswer: quizAnsReducer,
        filter: filterReducer,
    },
    // devTools: process.env.NODE_ENV !== "production",
});

export default store;
