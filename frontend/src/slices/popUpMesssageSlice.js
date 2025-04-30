import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    isVisible: false,
    type: "" // can be extended later for 'success', 'warning', etc.
};

const popupMessageSlice = createSlice({
    name: "popUpMessage",
    initialState,
    reducers: {
        showPopup: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || "error";
            state.isVisible = true;
        },
        hidePopup: (state) => {
            state.message = "";
            state.isVisible = false;
        }
    }
});

export const { showPopup, hidePopup } = popupMessageSlice.actions;
export default popupMessageSlice.reducer;
