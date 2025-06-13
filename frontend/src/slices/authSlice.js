import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isUser: false,
    login: false,
    otpsent: false,
    signup: false,
    isProfileComplete: false
}

const statusSlice = createSlice({
    name:"status",
    initialState,
    reducers:{
        setAuthStatus : (state,action) => {
            const { isUser, login, otpsent, signup, isProfileComplete } = action.payload;
            if (isUser !== undefined) state.isUser = isUser;
            if (login !== undefined) state.login = login;
            if (otpsent !== undefined) state.otpsent = otpsent;
            if (signup !== undefined) state.signup = signup;
            if (isProfileComplete !== undefined) state.isProfileComplete = isProfileComplete;
        },
        isUserAuthenticated : (state,action) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const {setAuthStatus} = statusSlice.actions
export default statusSlice.reducer