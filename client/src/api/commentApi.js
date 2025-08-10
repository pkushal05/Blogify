// Base URL for comment-related API endpoints
const BASE_URL = "http://localhost:3000/api/v1/comments";

/**
 * Creates a comment for a specific blog post.
 * Sends a POST request with the comment content.
 *
 * @param {string} id - The blog post ID to comment on.
 * @param {string} content - The content of the comment.
 * @returns {Promise<Object>} - The created comment data.
 * @throws {Error} - Throws if comment creation fails.
 */
export const createComment = async (id, content) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
    credentials: "include", // Include cookies/session for auth
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to publish comment");
  }
  return data;
};
