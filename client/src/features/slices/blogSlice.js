import { createSlice } from "@reduxjs/toolkit";
import {
  create,
  get,
  makeComment,
  editBlog,
  like,
  deleteThunk,
  getBlogs,
} from "../thunks/blogThunks.js";

// Initial state for the blog slice
const initialState = {
  message: null, // message for success or error feedback
  currentBlog: null, // currently viewed blog details
  allBlogs: [], // list of all blogs fetched
  blogs: [], // user's blogs or created blogs
  likes: [], // likes related data
  comments: [], // comments related data (not heavily used here)
  loading: false, // loading state for async actions
  showSuccessMessage: false, // flag to show success messages
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // Clears blog messages and success flag
    clearBlogMessages: (state) => {
      state.showSuccessMessage = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // for create blog
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
      });

    // for get single blog
    builder
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
      });

    // for make comment
    builder.addCase(makeComment.fulfilled, (state, action) => {
      if (state.currentBlog?.comments) {
        state.currentBlog.comments.push(action.payload.comment);
      } else if (state.currentBlog) {
        state.currentBlog.comments = [action.payload.comment];
      }
    });

    // for edit blog
    builder
      .addCase(editBlog.pending, (state) => {
        state.showSuccessMessage = false;
        state.loading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.currentBlog = action.payload.blog;
        state.message = action.payload.message;
        state.showSuccessMessage = true;
        state.loading = false;
      });

    // for like blog
    builder.addCase(like.fulfilled, (state, action) => {
      state.currentBlog.likes.push(action.payload.likes);
      state.likes.push(action.payload.likes);
    });

    // for delete blog
    builder.addCase(deleteThunk.fulfilled, (state, action) => {
      state.currentBlog = null;
      state.blogs = state.blogs.filter(
        (blog) => blog._id !== action.payload.id
      );
      state.message = action.payload.message;
      state.showSuccessMessage = true;
    });

    // for get all blogs
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload.blogs;
        state.message = action.payload.message;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.message = action.error.message;
        state.allBlogs = [];
      });
  },
});

export const { clearBlogMessages } = blogSlice.actions;
export default blogSlice.reducer;
