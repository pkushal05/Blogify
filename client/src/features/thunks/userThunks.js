import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, loginUser, registerUser } from "../../api/userApi.js";
import { updateUser } from "../../api/authApi.js";

export const checkLoginStatus = createAsyncThunk(
    "user/checkLoginStatus", isLoggedIn
);

export const login = createAsyncThunk(
    "user/login", loginUser
);

export const register = createAsyncThunk(
    "user/register", registerUser
);

export const update = createAsyncThunk("user/update", async (formData) => {
  return await updateUser(formData);
});
