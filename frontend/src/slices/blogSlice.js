import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    bloglists: [],
    blogId: "",
    tag: "all",
    article: {}
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogLists : (state,action) => {
            state.bloglists = action.payload
        },
        setBlogId: (state,action) => {
            state.blogId = action.payload
        },
        setTag: (state,action) => {
            state.tag = action.payload
        },
        setArticle: (state,action) => {
            state.article = action.payload
        }
    }
})

export const {setBlogLists,setBlogId,setTag,setArticle} = blogSlice.actions
export default blogSlice.reducer