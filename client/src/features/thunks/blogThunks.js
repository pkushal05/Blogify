import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBlog, getBlog, updateBlog, likeBlog, deleteBlog, getAll } from "../../api/blogApi.js";
import { createComment } from "../../api/commentApi.js";

export const create = createAsyncThunk("blog/create", async (formData) => {
    return await createBlog(formData);
});

export const get = createAsyncThunk("blog/get", async (id) => {
    return await getBlog(id);
});

export const makeComment = createAsyncThunk("blog/comment", async ({id, content}) => {
    return await createComment(id, content)
});

export const editBlog = createAsyncThunk("blog/edit", async ({id, formData}) => {
    return await updateBlog(id, formData)
});

export const like = createAsyncThunk("blog/like", async (id) => {
  return await likeBlog(id);
});

export const deleteThunk = createAsyncThunk("blog/delete", async (id) => {
    return await deleteBlog(id);
});

export const getBlogs = createAsyncThunk("blog/getAll", async (q) => {
    return await getAll(q);
});