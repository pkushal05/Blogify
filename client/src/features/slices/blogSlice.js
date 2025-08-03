import { createSlice } from "@reduxjs/toolkit";
import { create } from "../thunks/blogThunks.js";

const initialState = {
  message: null,
  blogs: [],
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
      });
  },
});

export const { clearBlogMessages } = blogSlice.actions;
export default blogSlice.reducer;