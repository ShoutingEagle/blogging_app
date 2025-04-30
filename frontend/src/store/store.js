import {configureStore} from "@reduxjs/toolkit"
import statusReducer from "../slices/authSlice.js"
import blogReducer from "../slices/blogSlice.js"
import popUpMessageReducer from "../slices/popUpMesssageSlice.js"

const store = configureStore({
    reducer:{
        status: statusReducer,
        blog: blogReducer,
        popUpMessage: popUpMessageReducer
    },
    devTools: true
})

export default store