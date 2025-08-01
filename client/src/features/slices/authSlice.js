import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../thunks/authThunks.js";

const initialState = {
  message: null,
  user: null,
  loading: false,
  showSuccessMessage: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      (state.message = null), (state.showSuccessMessage = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.showSuccessMessage = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = null;
        state.showSuccessMessage = true;
      })
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
