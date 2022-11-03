import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const initialState = {
    loading: false,
    error: "",
    isError: false,
    allQuiz: [],
    singleQuiz: [],
};

export const fetchQuiz = createAsyncThunk("quiz/fetchQuiz", async () => {
    const { data } = await supabase.from("quiz").select();
    return data;
});

export const fetchSingleQuiz = createAsyncThunk(
    "quiz/fetchSingleQuiz",
    async (id) => {
        const { data } = await supabase.from("quiz").select().eq("id", id);
        return data;
    }
);

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        addQuiz: (state, { payload }) => {
            state.allQuiz.push(payload);
        },
        changeStatus: (state, { payload }) => {
            state.allQuiz = state.allQuiz.map((quiz) => {
                if (payload.id === quiz.id) {
                    return {
                        ...quiz,
                        activeStatus: !quiz.activeStatus,
                    };
                }
                return quiz;
            });
        },
    },
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
            })
            .addCase(fetchSingleQuiz.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.isError = false;
                state.singleQuiz = [];
            })
            .addCase(fetchSingleQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.isError = false;
                state.error = "";
                state.singleQuiz = action.payload;
            })
            .addCase(fetchSingleQuiz.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action?.error?.message;
                state.singleQuiz = [];
            });
    },
});

export default quizSlice.reducer;
export const { addQuiz, changeStatus } = quizSlice.actions;
