import React, { useState } from 'react'
import { Button } from '../../components/ui/button.tsx'
import { useSidebar } from '../../components/ui/sidebar.tsx'
import { Bell, Search, Sidebar as SidebarIcon, UserCircle2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip'
import ThemeSelector from './ThemeSwitcher.jsx'
import { Input } from '../../components/ui/input'
import Logo from './Logo.jsx'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../components/ui/popover'

function Navbar() {
    const { setOpen, open } = useSidebar()
    const userData = useSelector(state => state.user)
    const navigate = useNavigate()
    const [profilePopOver, setProfilePopOver] = useState(false)

    const handleOpenSidebar = () => {
        setOpen(!open)
    }

    return (
        <div className='fixed top-0 left-0 w-full h-16 px-4 md:px-8 flex items-center justify-between border-b bg-background'>
            <div className='flex items-center gap-4'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleOpenSidebar}
                        >
                            <SidebarIcon className='w-5 h-5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Toggle Sidebar</p>
                    </TooltipContent>
                </Tooltip>
                <Logo size='md' />
            </div>

            <div className='hidden md:flex items-center gap-2 w-1/2 max-w-md'>
                <Input type='search' placeholder='Search Anything...' />
                <Button variant="ghost" size="icon">
                    <Search className='w-5 h-5' />
                </Button>
            </div>

            <div className='flex items-center gap-4'>
                <ThemeSelector />

                <Button variant="ghost" size="icon">
                    <Bell className='w-5 h-5' />
                </Button>

                {userData && userData.username ? (
                    <Popover>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="p-0 w-12 h-12 rounded-full flex items-center justify-center ring-gray-900 hover:ring-1"
                                        style={{ minWidth: "3rem", minHeight: "3rem" }}
                                    >
                                        <Avatar className="w-10 h-10 cursor-pointer">
                                            <AvatarImage
                                                src={userData.avatar || undefined}
                                                alt={userData.username || 'User'}
                                            />
                                            <AvatarFallback>
                                                {userData.username[0].toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Profile</p>
                            </TooltipContent>
                        </Tooltip>
                        <PopoverContent className="w-72 p-5 rounded-xl shadow-lg bg-background border">
                            <div className="flex flex-col items-center gap-3">
                                <Avatar className="w-16 h-16 border-2 border-primary shadow-md">
                                    <AvatarImage
                                        src={userData.avatar || undefined}
                                        alt={userData.username || 'User'}
                                    />
                                    <AvatarFallback className="text-2xl bg-muted">
                                        {userData.username[0]?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-center mt-1">
                                    <div className="font-semibold text-lg text-foreground">{userData.username}</div>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2 rounded-lg font-medium"
                                    onClick={() => navigate(`/profile/${userData.username}`)}
                                >
                                    <UserCircle2 className="w-5 h-5" />
                                    <span>Visit Profile</span>
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full flex items-center justify-center gap-2 rounded-lg font-medium"
                                // onClick={handleLogout}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                    </svg>
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 rounded-full flex items-center justify-center shadow border border-muted transition-all hover:scale-105 hover:shadow-lg bg-background"
                            >
                                <UserCircle2 style={{ height: "25px", width: "25px" }} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-8 rounded-2xl shadow-2xl bg-background border flex flex-col items-center gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-gradient-to-tr from-primary/10 to-muted/30 rounded-full p-2 mb-2 flex items-center justify-center">
                                    <UserCircle2 className="w-10 h-10 text-primary" />
                                </div>
                                <div className="text-xl font-bold text-foreground">Welcome!</div>
                                <div className="text-sm text-muted-foreground">Sign in to unlock all features</div>
                            </div>
                            <Button
                                variant="default"
                                onClick={() => navigate('/login')}
                                className="w-full py-3 text-base font-semibold rounded-lg shadow hover:bg-primary/90 transition"
                            >
                                Login
                            </Button>
                            <div className="mt-2 text-xs text-muted-foreground">
                                New here?{" "}
                                <span
                                    className="underline cursor-pointer text-primary font-medium hover:text-primary/80 transition"
                                    onClick={() => navigate('/signup')}
                                >
                                    Create an account
                                </span>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    )
}

export default Navbar
