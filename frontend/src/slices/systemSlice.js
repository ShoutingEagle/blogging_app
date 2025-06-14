import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSideBarOpen: false,
    cursor: null,
    hasMore: true
}

const systemSlice = createSlice({
    name: "systemSlice",
    initialState,
    reducers : {
        sidebarToggle: (state) => { 
            state.isSideBarOpen = !state.isSideBarOpen
        },
        setCursor:  (state,action) => {
            state.cursor = action.payload
        },
        setHasMore: (state,action) => {
            state.hasMore = action.payload
        },
        setSidebarToggle: (state,action) => {
            state.isSideBarOpen = action.payload
        }
    }
})

export const{sidebarToggle, setCursor, setHasMore, setSidebarToggle} = systemSlice.actions
export default systemSlice.reducer