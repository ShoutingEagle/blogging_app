// src/slices/userDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  otp: "",
  mode: "",
  username: "",
  profilePic: "",
  yourArticles: [],
  step: "enter-email", // optional form step tracker
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setYourArticles: (state,action) => {
      state.yourArticles = action.payload
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    resetUserData: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setEmail,
  setOtp,
  setMode,
  setUsername,
  setProfilePic,
  setYourArticles,
  setStep,
  resetUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
