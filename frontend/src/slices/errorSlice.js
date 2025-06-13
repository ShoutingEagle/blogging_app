import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalErrorMessage: null,
  localMessage: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    // Handles only global error message
    setGlobalError: (state, action) => {
      state.globalErrorMessage = action.payload;
    },

    // Handles only local error message
    setLocalMessage: (state, action) => {
      state.localMessage = action.payload;
    },

    // Optional: reset both
    clearErrors: (state) => {
      state.globalErrorMessage = null;
      state.localMessage = null;
    },
  },
});

export const { setGlobalError, setLocalMessage, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;

