// Base URL for blog-related API endpoints
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

/**
 * Creates a new blog post by sending a POST request with FormData.
 * FormData allows sending files like images along with other data.
 *
 * @param {FormData} formData - Blog post data including files.
 * @returns {Promise<Object>} - Created blog data from server.
 * @throws {Error} - Throws if creation fails.
 */
export const createBlog = async (formData) => {
  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    credentials: "include", // Include cookies/session for authentication
    body: formData, // Sending multipart/form-data
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to publish blog");
  }
  return data;
};

/**
 * Fetches a single blog post by ID with GET request.
 *
 * @param {string} id - Blog ID to fetch.
 * @returns {Promise<Object>} - Blog data.
 * @throws {Error} - Throws if fetch fails.
 */
export const getBlog = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch blog");
  }
  return data;
};

/**
 * Updates a blog post by ID with PATCH request.
 * Accepts FormData for updating fields including files.
 *
 * @param {string} id - Blog ID to update.
 * @param {FormData} formData - Updated blog data.
 * @returns {Promise<Object>} - Updated blog data.
 * @throws {Error} - Throws if update fails.
 */
export const updateBlog = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to edit blog");
  }
  return data;
};

/**
 * Likes a blog post by ID via POST request.
 *
 * @param {string} id - Blog ID to like.
 * @returns {Promise<Object>} - Server response after liking.
 * @throws {Error} - Throws if like action fails.
 */
export const likeBlog = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/like`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to like blog");
  }
  return data;
};

/**
 * Deletes a blog post by ID with DELETE request.
 *
 * @param {string} id - Blog ID to delete.
 * @returns {Promise<Object>} - Contains deleted blog ID and server message.
 * @throws {Error} - Throws if delete fails.
 */
export const deleteBlog = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete blog");
  }
  return { id, message: data.message };
};

/**
 * Fetches all blogs or filtered by search query.
 * If query `q` is provided, performs search with that query.
 *
 * @param {string} [q] - Optional search query string.
 * @returns {Promise<Object[]>} - Array of blog posts.
 * @throws {Error} - Throws if fetch fails.
 */
export const getAll = async (q) => {
  const url = q ? `${BASE_URL}/?q=${encodeURIComponent(q)}` : `${BASE_URL}/`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch blogs");
  }
  return data;
};
