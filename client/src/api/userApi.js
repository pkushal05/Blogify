// Base URL for user-related API endpoints
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

/**
 * Checks if the user is currently logged in by verifying the session status.
 * Sends a GET request with credentials included.
 *
 * @returns {Promise<Object>} - User login status and info.
 * @throws {Error} - Throws if login status check fails.
 */
export const isLoggedIn = async () => {
  const res = await fetch(`${BASE_URL}/status`, {
    method: "GET",
    credentials: "include", // Include cookies/session for auth
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to check login status");
  }
  return data;
};

/**
 * Logs in a user by sending credentials to the server.
 * Sends a POST request with JSON body containing user credentials.
 *
 * @param {Object} userData - User login data (e.g., email, password).
 * @returns {Promise<Object>} - Logged-in user data and token.
 * @throws {Error} - Throws if login fails.
 */
export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include", // Include cookies/session for auth
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

/**
 * Registers a new user by sending user details to the server.
 * Sends a POST request with JSON body containing user registration data.
 *
 * @param {Object} userData - User registration data (e.g., name, email, password).
 * @returns {Promise<Object>} - Newly registered user data.
 * @throws {Error} - Throws if registration fails.
 */
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include", // Include cookies/session for auth
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data.user;
};
