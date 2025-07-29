import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/users`;

export const registerUser = async ({ fullName, username, email, password, avatar, coverImg }) => {
    try {
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        if (avatar) {
            formData.set('avatar', avatar);
        }
        if (coverImg) {
            formData.set('coverImg', coverImg);
        }

        const response = await axios.post(
            `${API_URL}/register`,
            formData,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { success: false, message: "An unexpected error occurred during signup." };
    }
}

export const loginUser = async ({ login, password }) => {
    const response = await axios.post(`${API_URL}/login`,
        {
            login,
            password,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.data || null;
}

export const logoutUser = async () => {
    const response = await axios.get(`${API_URL}/logout`, {}, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    })
    return response.data || null;
}

export const updateUserProfile = async ({ fullName, username, email }) => {
    const response = await axios.put(`${API_URL}/update-profile`,
        {
            fullName,
            username,
            email,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.data || null;
}

export const updateUserAvatar = async (avatar) => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    const response = await axios.put(`${API_URL}/change-avatar`,
        {
            formData,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.data || null;
}

export const updateUserCoverImg = async (coverImg) => {
    const formData = new FormData()
    formData.append('coverImg', coverImg)
    const response = await axios.put(`${API_URL}/change-coverimg`,
        {
            formData,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.data || null;
}

export const changePassword = async ({ oldPassword, newPassword }) => {
    const response = await axios.post(`${API_URL}/change-password`,
        {
            oldPassword,
            newPassword,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.data || null;
}

export const getUserProfile = async () => {
    const response = await axios.get(`${API_URL}/get-profile`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data || null;
}

export const fetchProfile = async (userID) => {
    const response = await axios.get(`${API_URL}/fetch-profile/${userID}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data || null;
}

export const addTowatchHistory = async (videoId) => {
    const response = await axios.get(`${API_URL}/add-to-history/${videoId}`,
        {
            withCredentials: true,
            header: {
                "Content-Type": "application/json",
            },
        }
    )
    return response || null;
}

export const removeFromWatchHistory = async (videoId) => {
    const response = await axios.delete(`${API_URL}/remove-history/${videoId}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const getWatchHistory = async () => {
    const response = await axios.get(`${API_URL}/get-watch-history`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    })
}