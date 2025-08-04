const BASE_URL = "http://localhost:3000/api/v1/comments";

export const createComment = async (id, content) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({content}),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to publish blog");
  }
  return data;
};
