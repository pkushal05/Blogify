import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBlog } from "../../api/blogApi.js";

export const create = createAsyncThunk("blog/create", async (formData) => {
    return await createBlog(formData);
});