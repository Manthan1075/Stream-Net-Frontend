import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        darkMode: false,
        sidebarOpen: true,
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        toggleSidebarOpen: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        }
    }
})

export const { toggleDarkMode, toggleSidebarOpen } = uiSlice.actions;

export default uiSlice.reducer;