const BASE_URL = "http://localhost:3000/api/v1/auth";

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to log out user");
  }
  return data;
};

export const updateUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/update`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update details");
  }
  return data;
}