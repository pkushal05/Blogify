const BASE_URL = "http://localhost:3000/api/v1/user";

export const isLoggedIn = async () => {
    try {
        const res = await fetch(`${BASE_URL}/status`, {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
};
