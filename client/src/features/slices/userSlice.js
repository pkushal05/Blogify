import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    checkLoginStatus,
    login,
    register
} from "../thunks/userThunks.js";


const initialState = {
    isLoggedIn: false,
    user: null,
    message: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.message = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = null;
            state.message = action.error.message || "Login failed";
        }).addCase(register.pending, (state) => {
            state.loading = true;
            state.message = null;
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = null;
            state.message = action.error.message || "Registration failed";
        }).addCase(checkLoginStatus.pending, (state) => {
            state.loading = true;
            state.message = null;
        }).addCase(checkLoginStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.message = action.payload.message;
        }).addCase(checkLoginStatus.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = action.payload.isLoggedIn || false;
            state.message = action.error.message || "Check login status failed";
        });
    }
});

export const { Logout } = userSlice.actions;

export default userSlice.reducer;