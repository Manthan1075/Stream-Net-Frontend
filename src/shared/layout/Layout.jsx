import React from 'react'
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'
import AppSidebar from '../components/AppSidebar.jsx'
import Navbar from '../components/Navbar.jsx'

function Layout({ children }) {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "15rem",
            }}
        >
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <AppSidebar />
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}

export default Layout
