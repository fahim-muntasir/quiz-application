import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const initialState = {
    searchQuery: "",
    searchBy: "",
    statusType: "",
    loading: false,
    isError: false,
    error: "",
    searchResult: [],
};

export const fetchQuizBySearchQuery = createAsyncThunk(
    "filter/fetchQuizBySearchQuery",
    async ({
        userWantToSearch = "admin",
        query,
        quizStatusForSearch = true,
    }) => {
        const { data } = await supabase
            .from("quiz")
            .select()
            .like(userWantToSearch, `%${query}%`);
        console.log(data);
        return data;
    }
);

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        search: (state, action) => {
            state.searchQuery = action.payload;
        },
        searchReset: (state) => {
            state.searchQuery = "";
        },
        setSearchBy: (state, action) => {
            state.searchBy = action.payload;
        },
        setStatusType: (state, action) => {
            state.statusType = action.payload;
        },
        resetFilter: (state) => {
            state.searchBy = "";
            state.statusType = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizBySearchQuery.pending, (state) => {
                state.loading = true;
                state.isError = false;
                state.error = "";
                state.searchResult = [];
            })
            .addCase(fetchQuizBySearchQuery.fulfilled, (state, action) => {
                state.loading = false;
                state.isError = false;
                state.error = "";
                state.searchResult = action.payload;
            })
            .addCase(fetchQuizBySearchQuery.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action?.error?.message;
                state.searchResult = [];
            });
    },
});

export default filterSlice.reducer;
export const { search, setSearchBy, setStatusType, searchReset, resetFilter } =
    filterSlice.actions;
