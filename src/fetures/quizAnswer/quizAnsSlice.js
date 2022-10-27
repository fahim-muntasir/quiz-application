import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedAnswers: {},
};

const quizAnsSlice = createSlice({
    name: "quizAnswer",
    initialState,
    reducers: {
        selectAns: (state, action) => {
            const { currentQuestion, text } = action.payload;
            if (state.selectedAnswers[currentQuestion]) {
                if (state.selectedAnswers[currentQuestion].includes(text)) {
                    const indexOfValue =
                        state.selectedAnswers[currentQuestion].indexOf(text);
                    state.selectedAnswers[currentQuestion].splice(
                        indexOfValue,
                        1
                    );
                } else {
                    state.selectedAnswers[currentQuestion].push(text);
                }
            } else {
                state.selectedAnswers[currentQuestion] = [text];
            }
        },
    },
});

export default quizAnsSlice.reducer;
export const { selectAns } = quizAnsSlice.actions;
