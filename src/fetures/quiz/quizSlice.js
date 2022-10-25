import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const initialState = {
    loading: false,
    error: "",
    isError: false,
    allQuiz: [],
};

export const fetchQuiz = createAsyncThunk("quiz/fetchQuiz", async () => {
    const { data } = await supabase.from("quiz").select();
    return data;
});

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuiz.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.isError = false;
                state.allQuiz = [];
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.isError = false;
                state.error = "";
                state.allQuiz = action.payload;
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action?.error?.message;
                state.allQuiz = [];
            });
    },
});

export default quizSlice.reducer;
