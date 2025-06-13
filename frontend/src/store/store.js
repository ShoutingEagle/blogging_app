import {configureStore} from "@reduxjs/toolkit"
import statusReducer from "../slices/authSlice.js"
import blogReducer from "../slices/blogSlice.js"
import errorReducer from "../slices/errorSlice.js"
import systemReducer from "../slices/systemSlice.js"
import userDataReducer from "../slices/userDataSlice.js"

const store = configureStore({
    reducer:{
        status: statusReducer,
        userData: userDataReducer,
        blog: blogReducer,
        error: errorReducer,
        system : systemReducer
    },
    devTools: true
})

export default store