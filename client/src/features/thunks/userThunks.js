import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, loginUser, registerUser } from "../../api/userApi.js";
import { updateUser } from "../../api/authApi.js";

// Async thunk to check if the user is logged in
export const checkLoginStatus = createAsyncThunk(
  "user/checkLoginStatus",
  isLoggedIn
);

// Async thunk to login a user
export const login = createAsyncThunk("user/login", loginUser);

// Async thunk to register a new user
export const register = createAsyncThunk("user/register", registerUser);

// Async thunk to update user details
export const update = createAsyncThunk("user/update", async (formData) => {
  return await updateUser(formData);
});
