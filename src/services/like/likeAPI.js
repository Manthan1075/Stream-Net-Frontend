import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/like`;

export const toggleLike = async ({ contentId, contentType }) => {
    const response = await axios.post(`${API_URL}/toggle-like`, { contentId, contentType }, {
        withCredentials: true,
    })
    return response.data || null;
}