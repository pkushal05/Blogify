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
