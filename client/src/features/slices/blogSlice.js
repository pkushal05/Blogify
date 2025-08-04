import { createSlice } from "@reduxjs/toolkit";
import { create, get, makeComment } from "../thunks/blogThunks.js";

const initialState = {
  message: null,
  currentBlog: null,
  blogs: [],
  likes: [],
  comments: [],
  loading: false,
  showSuccessMessage: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearBlogMessages: (state) => {
      state.message = null;
      state.showSuccessMessage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.showSuccessMessage = false;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.blogs.push(action.payload.blog);
        state.showSuccessMessage = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message || "Failed to publish blog";
        state.showSuccessMessage = false;
      })
      .addCase(get.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload.blog;
        state.message = action.payload.message;
      })
      .addCase(get.rejected, (state, action) => {
        state.loading = false;
        state.currentBlog = null;
        state.message = action.error.message || "Failed to fetch blog";
      })
      .addCase(makeComment.fulfilled, (state, action) => {
        if (state.currentBlog?.comments) {
          state.currentBlog.comments.push(action.payload.comment);
        } else if (state.currentBlog) {
          state.currentBlog.comments = [action.payload.comment];
        }
        state.message = action.payload.message || "Comment added successfully";
      });

  },
});

export const { clearBlogMessages } = blogSlice.actions;
export default blogSlice.reducer;