import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/auth/authSlice";
import modalReducer from "../fetures/modal/modalSlice";
import quizReducer from "../fetures/quiz/quizSlice";
import quizAnsReducer from "../fetures/quizAnswer/quizAnsSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        quiz: quizReducer,
        quizAnswer: quizAnsReducer,
    },
    // devTools: process.env.NODE_ENV !== "production",
});

export default store;
