import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    bloglists : []
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogLists : (state,action) => {
            state.bloglists = action.payload
        }
    }
})

export const {setBlogLists} = blogSlice.actions
export default blogSlice.reducer