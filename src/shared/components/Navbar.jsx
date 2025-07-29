import React from 'react'
import { Button } from '../../components/ui/button.tsx'
import { useSidebar } from '../../components/ui/sidebar.tsx'
import { Bell, Search, Sidebar } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import ThemeSelector from './ThemeSwitcher.jsx';
import { Input } from '../../components/ui/input'
import Logo from './Logo.jsx';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { useSelector } from 'react-redux';

function Navbar() {
    const { setOpen, open } = useSidebar()
    const userData = useSelector(state => state.user);


    const handleOpenSidebar = () => {
        setOpen(!open)
    }



    return (
        <div className='fixed top-0 left-0 w-screen h-16 flex items-center-safe justify-between'>
            <header>

                <div>
                    <Button
                        onClick={handleOpenSidebar}
                    >
                        <Tooltip>
                            <TooltipTrigger>
                                <Sidebar />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Open Sidebar</p>
                            </TooltipContent>
                        </Tooltip>
                    </Button>
                    <Logo size='md' />
                </div>
            </header>
            <div>
                <Input type='search' placeholder='Search Anything ' />
                <button><Search /> </button>
            </div>
            <nav>
                <div>
                    <ThemeSelector />
                    <Bell />
                    <div>
                        <Avatar>
                            <AvatarImage src='https://imgs.search.brave.com/igAdo2B3-uA9OY9Jm2vNsEZCQWq2TEzZGnoIyRIKLJ4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cmVkZGl0c3RhdGlj/LmNvbS9hdmF0YXJz/L2RlZmF1bHRzL3Yy/L2F2YXRhcl9kZWZh/dWx0XzIucG5n' />
                            <AvatarFallback>
                                <span>A</span>
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Navbar
