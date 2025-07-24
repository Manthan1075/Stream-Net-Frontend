import React from 'react'
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'
import AppSidebar from '../components/AppSidebar.jsx'
import Navbar from '../components/Navbar.jsx'

function Layout({ childern }) {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "15rem",
            }
            }
        >
            <Navbar />
            <AppSidebar />
            {
                childern
            }
        </SidebarProvider >
    )
}

export default Layout
