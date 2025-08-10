// Base URL for all authentication-related API endpoints
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

/**
 * Logs out the current user by sending a POST request to the logout endpoint.
 * Uses credentials: "include" to send cookies/session info with the request.
 *
 * @returns {Promise<Object>} - Response data from the server if logout is successful.
 * @throws {Error} - Throws error if the logout request fails.
 */
export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Inform server that request body is JSON (though no body here)
    },
    credentials: "include", // Include cookies for session management
  });

  const data = await res.json();

  if (!res.ok) {
    // Throw error with message from server or default message
    throw new Error(data.message || "Failed to log out user");
  }

  return data;
};

/**
 * Updates user details by sending a PATCH request with FormData payload.
 * Typically used for updating profile info including file uploads (e.g., profile picture).
 * Uses credentials: "include" to authenticate the user session.
 *
 * @param {FormData} formData - FormData object containing user details to update.
 * @returns {Promise<Object>} - Response data from the server if update is successful.
 * @throws {Error} - Throws error if the update request fails.
 */
export const updateUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/update`, {
    method: "PATCH",
    credentials: "include", // Include cookies/session for authentication
    body: formData, // Send form data directly, content-type header is auto-set by browser
  });

  const data = await res.json();

  if (!res.ok) {
    // Throw error with message from server or default message
    throw new Error(data.message || "Failed to update details");
  }

  return data;
};
