import { createSlice } from "@reduxjs/toolkit";
import {
  checkLoginStatus,
  login,
  register,
  update,
} from "../thunks/userThunks.js";
import {
  create,
  makeComment,
  like,
  deleteThunk,
} from "../thunks/blogThunks.js";

const initialState = {
  isLoggedIn: false, // user login status
  user: null, // logged in user data
  message: null, // success or error messages
  loading: false, // loading state for async actions
  showSuccessMessage: false, // flag to show success messages
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Clear messages and success flag
    clearUserMessages: (state) => {
      state.message = null;
      state.showSuccessMessage = false;
    },
  },
  extraReducers: (builder) => {
    // Login related actions
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.showSuccessMessage = false;
        state.user = null;
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

      // Registration related actions
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.user = null;
        state.showSuccessMessage = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = true;
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

      // Check login status actions
      .addCase(checkLoginStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user = action.payload.user;
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload?.isLoggedIn || false;
        state.user = null;
      })

      // Update user details actions
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.showSuccessMessage = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = {
          ...state.user,
          userName: action.payload.user.userName,
          profilePic: action.payload.user.profilePic,
        };
        state.showSuccessMessage = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message || "Failed to update";
        state.user = null;
        state.showSuccessMessage = false;
      })

      // Blog create action updates user's blogs
      .addCase(create.fulfilled, (state, action) => {
        if (state.user?.blogs) {
          state.user.blogs.unshift(action.payload.blog);
        }
        state.message = action.payload.message;
        state.showSuccessMessage = true;
      })

      // Make comment updates user's commented blogs list
      .addCase(makeComment.fulfilled, (state, action) => {
        if (state.user?.comments) {
          if (!state.user.comments.includes(action.payload.comment.blog)) {
            state.user.comments.push(action.payload.comment.blog);
          }
        }
      })

      // Like action updates user's likes
      .addCase(like.fulfilled, (state, action) => {
        if (state.user?.likes) {
          state.user.likes = action.payload.userLikes;
        }
      })

      // Delete blog action updates user's blogs, likes, and comments
      .addCase(deleteThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.blogs = state.user.blogs.filter(
            (blog) => blog._id !== action.payload.id
          );
          state.user.likes = state.user.likes.filter(
            (blogId) => blogId !== action.payload.id
          );
          state.user.comments = state.user.comments.filter(
            (blogId) => blogId !== action.payload.id
          );
        }
        state.message = action.payload.message;
        state.showSuccessMessage = true;
      });
  },
});

export const { clearUserMessages } = userSlice.actions;

export default userSlice.reducer;
