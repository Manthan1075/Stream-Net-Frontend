import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/video`;


export const uploadVideo = async ({ description, title, videoFile, thumbnail }) => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('title', title);
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);

    const response = await axios.post(
        `${API_URL}/publish-video`,
        formData,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data || null;
}

export const updateVideoDetails = async (videoId, { description, title }) => {
    const response = await axios.put(
        `${API_URL}("/update-published-video/${videoId}`,
        { description, title },
        {
            withCredentials: true,
        }
    );
    return response.data || null;
}

export const deleteVideo = async (videoId) => {
    const response = await axios.delete(
        `${API_URL}/delete-published-video/${videoId}`,
        {
            withCredentials: true,
        }
    );
    return response.data || null;
}

export const getVideoById = async (videoId) => {
    const response = await axios.get(
        `${API_URL}/get-video/${videoId}`,
        {
            withCredentials: true,
        }
    );
    return response.data || null;
}

export const getPublishedVideos = async ({ page, limit = 10, sortType = "latest", query = "", type = "video" }) => {
    const response = await axios.get(
        `${API_URL}/get-published-videos?page=${page}&limit=${limit}&sortType=${sortType}&query=${query}&type=${type}`,
        {
            withCredentials: true,
        }
    );
    return response.data || null;

}

export const changeThumbnail = async (videoId, thumbnail) => {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);
    const response = await axios.patch(
        `${API_URL}/change-thumbnail/${videoId}`,
        formData,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    )
    return response.data || null;
}

export const getUserVideos = async (userId) => {
    const response = await axios.get(
        `${API_URL}/get-user-videos/${userId}`,
        {
            withCredentials: true,
        }
    );
    return response.data || null;
}