import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/comment`;

export const postComment = async ({ text, contentType, contentId }) => {
    const response = await axios.post(`${API_URL}/post-comment`,
        {
            text,
            contentType,
            contentId
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    return response.data || null;
}

export const editComment = async (commentId, text) => {
    const response = await axios.post(`${API_URL}/edit-comment/${commentId}`,
        {
            text
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    return response.data || null;
}

export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${API_URL}/delete-comment/${commentId}`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    return response.data || null;
}

