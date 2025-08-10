import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import authReducer from "../slices/authSlice.js";
import blogReducer from "../slices/blogSlice.js";

// Configure Redux store with user, auth, and blog reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    blog: blogReducer,
  },
});

export default store;
