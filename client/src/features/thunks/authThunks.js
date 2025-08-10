import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "../../api/authApi.js";

// Create async thunk for logging out user
export const logout = createAsyncThunk("auth/logout", logoutUser);
