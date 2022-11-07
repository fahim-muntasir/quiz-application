import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const initialState = {
    loading: false,
    deleting: false,
    deleteIsError: false,
    deleteError: "",
    error: "",
    isError: false,
    allQuiz: [],
    singleQuiz: [],
};

// get all quiz
export const fetchQuiz = createAsyncThunk("quiz/fetchQuiz", async () => {
    const { data } = await supabase.from("quiz").select();
    return data;
});

// get single quiz
export const fetchSingleQuiz = createAsyncThunk(
    "quiz/fetchSingleQuiz",
    async (id) => {
        const { data } = await supabase.from("quiz").select().eq("id", id);
        return data;
    }
);

// delete quiz
export const deleteQuiz = createAsyncThunk("quiz/deleteQuiz", async (id) => {
    const { data } = await supabase.from("quiz").delete().eq("id", id).select();
    return data?.[0];
});

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
            })
            .addCase(deleteQuiz.pending, (state) => {
                state.deleting = true;
                state.deleteIsError = false;
                state.deleteError = "";
            })
            .addCase(deleteQuiz.fulfilled, (state, { payload }) => {
                state.deleting = false;
                state.deleteIsError = false;
                state.deleteError = "";
                state.allQuiz = state.allQuiz.filter(
                    (quiz) => quiz.id !== payload.id
                );
            })
            .addCase(deleteQuiz.rejected, (state, action) => {
                state.deleting = false;
                state.deleteIsError = true;
                state.deleteError = action?.error?.message;
            });
    },
});

export default quizSlice.reducer;
export const { addQuiz, changeStatus } = quizSlice.actions;
