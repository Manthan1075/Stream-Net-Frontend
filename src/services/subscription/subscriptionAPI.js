import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/subscription`;

export const toggleSubscription = async (channelID) => {
    const response = await axios.get(`${API_URL}/toggle-subscription/${channelID}`, {
        withCredentials: true
    })
    return response.data || null;
}