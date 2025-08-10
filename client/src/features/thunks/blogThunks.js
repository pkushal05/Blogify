import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlog,
  getBlog,
  updateBlog,
  likeBlog,
  deleteBlog,
  getAll,
} from "../../api/blogApi.js";
import { createComment } from "../../api/commentApi.js";

// Async thunk to create a new blog post
export const create = createAsyncThunk("blog/create", async (formData) => {
  return await createBlog(formData);
});

// Async thunk to get a blog post by ID
export const get = createAsyncThunk("blog/get", async (id) => {
  return await getBlog(id);
});

// Async thunk to create a comment on a blog post
export const makeComment = createAsyncThunk(
  "blog/comment",
  async ({ id, content }) => {
    return await createComment(id, content);
  }
);

// Async thunk to edit a blog post by ID
export const editBlog = createAsyncThunk(
  "blog/edit",
  async ({ id, formData }) => {
    return await updateBlog(id, formData);
  }
);

// Async thunk to like a blog post by ID
export const like = createAsyncThunk("blog/like", async (id) => {
  return await likeBlog(id);
});

// Async thunk to delete a blog post by ID
export const deleteThunk = createAsyncThunk("blog/delete", async (id) => {
  return await deleteBlog(id);
});

// Async thunk to fetch all blogs with optional query
export const getBlogs = createAsyncThunk("blog/getAll", async (q) => {
  return await getAll(q);
});
