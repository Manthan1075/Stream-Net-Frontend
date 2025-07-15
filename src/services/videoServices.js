import { createSelector, createSlice } from '@reduxjs/toolkit'

const videoSlice = createSlice({
    name: "video",
    initialState: {
        videos: [],
        currentVideo: null,
        loading: false,
        error: null,
        currentVideoTime: null,
        currentVideo: null,
    },
    reducers: {
        setVideo: (state, action) => {
            state.videos.push(action.payload.video);
        },
        setCurrentVideo: (state, action) => {
            state.currentVideo = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCurrentVideoTime: (state, action) => {
            state.currentVideoTime = action.payload;
        },
    }
})

export const { setVideo, setCurrentVideo, setLoading, setError, setCurrentVideoTime } = videoSlice.actions;

export default videoSlice.reducer;