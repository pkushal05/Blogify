const BASE_URL = "http://localhost:3000/api/v1/blogs";

export const createBlog = async (formData) => {
  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to publish blog");
  }
  return data;
};

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
