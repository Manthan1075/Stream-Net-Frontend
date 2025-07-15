import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: [],
    },
    reducers: {
        setQuery: (state, action) => {
            state.query.push(action.payload.query);
        },
        removeQuery: (state, action) => {
            state.query = state.query.filter((query) => query !== action.payload.query);
        },
    }
})

export const { setQuery, setLoading } = searchSlice.actions;
export default searchSlice.reducer;