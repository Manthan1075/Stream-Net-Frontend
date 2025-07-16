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
            document.documentElement.classList.add(state.darkMode ? "dark" : "light");
            document.documentElement.classList.remove(state.darkMode ? "light" : "dark");
        },
        toggleSidebarOpen: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        }
    }
})

export const { toggleDarkMode, toggleSidebarOpen } = uiSlice.actions;

export default uiSlice.reducer;