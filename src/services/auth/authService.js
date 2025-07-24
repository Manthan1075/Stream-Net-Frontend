import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: null,
        email: null,
        fullName: null,
        avatar: null,
        coverImg: null,
        isLoggedIn: false
    },
    reducers: {
        loginUser: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.fullName = action.payload.fullName
            state.avatar = action.payload.avatar
            state.coverImg = action.payload.coverImg
            state.isLoggedIn = true
        },
        logoutUser: (state) => {
            state.username = null
            state.email = null
            state.fullName = null
            state.avatar = null
            state.coverImg = null
            state.isLoggedIn = false
        }
    }
})

export const {
    loginUser,
    logoutUser
} = userSlice.actions

export default userSlice.reducer