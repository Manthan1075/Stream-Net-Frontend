import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../services/auth/authAPI.js';
import { loginUser } from '../services/auth/authService.js';
import MainLoader from './Loaders/MainLoader.jsx';

function PersistLogin({ children }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await getUserProfile();
                if (res?.success) {
                    dispatch(loginUser(res.data.user));
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, [dispatch]);

    if (loading) return <MainLoader />;
    return children;
}

export default PersistLogin;
