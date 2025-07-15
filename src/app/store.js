import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducer.js'

const store = configureStore({
    reducer: reducers
})

export default store