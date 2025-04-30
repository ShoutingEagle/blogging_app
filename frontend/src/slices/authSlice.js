import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userStatus : null,
}

const statusSlice = createSlice({
    name:"status",
    initialState,
    reducers:{
        checkAuthStatus : (state,action) => {
            state.userStatus = action.payload
        },
    }
})

export const {checkAuthStatus} = statusSlice.actions
export default statusSlice.reducer