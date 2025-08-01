import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkLoginStatus, login, register } from "../thunks/userThunks.js";

const initialState = {
  isLoggedIn: false,
  user: null,
  message: null,
  loading: false,
  showSuccessMessage: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserMessages: (state) => {
      (state.message = null), (state.showSuccessMessage = false);
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.showSuccessMessage = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.showSuccessMessage = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.error.message || "Login failed";
        state.showSuccessMessage = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.showSuccessMessage = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.showSuccessMessage = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.error.message || "Registration failed";
        state.showSuccessMessage = false;
      })
      .addCase(checkLoginStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload.isLoggedIn || false;
      });
  },
});

export const { clearUserMessages } = userSlice.actions;

export default userSlice.reducer;
