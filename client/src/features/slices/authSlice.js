import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../thunks/authThunks.js";

// Initial state for the auth slice
const initialState = {
  message: null, // Stores messages such as success or error notifications
  user: null, // Holds user information after login
  loading: false, // Tracks loading state during async actions
  showSuccessMessage: false, // Flag to show success messages
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Clears messages and hides success messages
    clearMessage: (state) => {
      (state.message = null), (state.showSuccessMessage = false);
    },
  },
  extraReducers: (builder) => {
    builder
      // When logout is in progress, set loading true and clear messages
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.showSuccessMessage = false;
      })
      // When logout succeeds, set loading false, clear user and show success message
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = null;
        state.showSuccessMessage = true;
      })
      // When logout fails, set loading false, clear user, and store error message
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message || "Failed to log out user";
        state.user = null;
        state.showSuccessMessage = false;
      });
  },
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;
