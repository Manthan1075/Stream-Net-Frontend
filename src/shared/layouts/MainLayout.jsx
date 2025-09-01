import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar, { NAVBAR_HEIGHT } from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main
                className="flex-1"
                style={{ paddingTop: NAVBAR_HEIGHT }}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
