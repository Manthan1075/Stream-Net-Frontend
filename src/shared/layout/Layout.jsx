import React from 'react';
import { SidebarProvider } from '../../components/ui/sidebar';
import AppSidebar from '../components/AppSidebar.jsx';
import Navbar, { NAVBAR_HEIGHT } from '../components/Navbar.jsx';
import PersistLogin from '../PersistLogin.jsx';
import { Outlet } from 'react-router-dom';

function Layout({ children }) {
    return (
        <PersistLogin>
            <SidebarProvider
                style={{
                    '--sidebar-width': '20rem',
                    '--sidebar-width-mobile': '15rem',
                }}
            >
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <div className="flex flex-1" style={{ paddingTop: NAVBAR_HEIGHT }}>
                        <AppSidebar />
                        <main className="flex-1">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </PersistLogin>
    );
}

export default Layout;
