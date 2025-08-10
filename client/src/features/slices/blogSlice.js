import { createSlice } from "@reduxjs/toolkit";
import {
  create,
  get,
  makeComment,
  editBlog,
  like,
  deleteThunk,
  getBlogs
} from "../thunks/blogThunks.js";

const initialState = {
  message: null,
  currentBlog: null,
  allBlogs: [],
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
      state.showSuccessMessage = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.showSuccessMessage = false;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
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
      })
      .addCase(get.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload.blog;
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
      })
      .addCase(editBlog.pending, (state, action) => {
        state.showSuccessMessage = false;
        state.loading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.currentBlog = action.payload.blog;
        state.message = action.payload.message;
        state.showSuccessMessage = true;
        state.loading = false;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.currentBlog.likes.push(action.payload.likes);
        state.likes.push(action.payload.likes);
      })
      .addCase(deleteThunk.fulfilled, (state, action) => {
        state.currentBlog = null;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload.id
        );
        state.message = action.payload.message;
        state.showSuccessMessage = true;
      })
      .addCase(getBlogs.pending, (state) => {
        state.message = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload.blogs;
        state.message = action.payload.message;
      });
  },
});

export const { clearBlogMessages } = blogSlice.actions;
export default blogSlice.reducer;
