import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBlog, getBlog } from "../../api/blogApi.js";
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