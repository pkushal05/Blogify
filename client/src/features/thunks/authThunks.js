import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "../../api/authApi.js";

export const logout = createAsyncThunk("auth/logout", logoutUser);