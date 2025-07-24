import React from 'react'
import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '../../components/ui/sidebar'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebarOpen } from '../../services/ui/uiServices.js';
import { Button } from '../../components/ui/button';
import { X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';

function AppSidebar() {
  const dispatch = useDispatch();
  const { open, setOpen } = useSidebar();

  const handleToggle = () => {
    setOpen(!open)
    dispatch(toggleSidebarOpen());
  }

  return (
    <Sidebar
      collapsible="offcanvas"
    >
      <Button
        aria-label="Close sidebar"
        onClick={handleToggle}
        className="absolute top-3 right-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-lg"
      >
        <Tooltip>
          <TooltipTrigger>
            <X
              style={{ height: 20, width: 25 }}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Close Sidebar
          </TooltipContent>
        </Tooltip>
      </Button>
      <SidebarHeader>
        <div className='w-full flex justify-center'>
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>

      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
