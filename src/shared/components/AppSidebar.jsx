import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '../../components/ui/sidebar';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarOpen } from '../../services/ui/uiServices.js';
import { Button } from '../../components/ui/button';
import { UserCircle2, X, Home, ListVideo, History, UsersRound, ThumbsUp, Mail, HelpCircle, MonitorPlay, StickyNote, MessageSquareText, Video, Bell, Search, Clock, BookImage } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';

function AppSidebar() {
  const dispatch = useDispatch();
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const appLinks = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Shorts', to: '/shorts', icon: Video },
    { name: 'Posts', to: '/post', icon: BookImage },
  ];

  const userLinks = [
    { name: 'My Videos', to: '/my-videos', icon: MonitorPlay },
    { name: 'Watch Later', to: '/watch-later', icon: Clock },
    { name: 'Liked Content', to: '/liked-content', icon: ThumbsUp },
    { name: 'Subscriber', to: '/subscribers', icon: UsersRound },
    { name: 'Subscriptions', to: '/subscriptions', icon: ListVideo },
    { name: 'History', to: '/history', icon: History },
    { name: 'My Post', to: '/my-posts', icon: StickyNote },
    { name: 'My Comments', to: '/my-comments', icon: MessageSquareText },
  ];

  const otherLinks = [
    { name: 'Help', to: '/help', icon: HelpCircle },
    { name: 'Contact Us', to: '/contact', icon: Mail },
  ]


  const handleClose = () => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
      dispatch(toggleSidebarOpen());
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 shadow-lg w-72"
    >
      {isMobile && (
        <div className="absolute top-5 right-1.5 z-50">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="bg-white/90 dark:bg-zinc-900/90 text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-slate-800/10 dark:hover:bg-white/10 hover:scale-110 shadow-lg ring-2 ring-black/10 dark:ring-white/10 rounded-full transition"
                onClick={handleClose}
                aria-label="Close Sidebar"
              >
                <X className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Close Sidebar</TooltipContent>
          </Tooltip>
        </div>
      )}

      <SidebarHeader className="flex justify-center items-center py-6">
        <Logo />
      </SidebarHeader>

      <div className="border-t border-gray-300 dark:border-zinc-700 my-2 mx-6" />

      <SidebarContent className="px-3 py-4 space-y-5">
        {/* App Section */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-3 shadow-sm">
          <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Explore
          </div>
          <div className="space-y-1 mt-1">
            {appLinks.map(({ name, to, icon: Icon }, index) => (
              <NavLink
                key={index}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all 
            ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-inner'
                    : 'hover:bg-gray-200 dark:hover:bg-zinc-700 hover:shadow-md'
                  }`
                }
                onClick={handleClose}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-3 shadow-sm">
          <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Your Content
          </div>
          <div className="space-y-1 mt-1">
            {userLinks.map(({ name, to, icon: Icon }, index) => (
              <NavLink
                key={index}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-inner'
                    : 'hover:bg-gray-200 dark:hover:bg-zinc-700 hover:shadow-md'
                  }`
                }
                onClick={handleClose}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Other Links Section */}
        {otherLinks && otherLinks.length > 0 && (
          <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-3 shadow-sm">
            <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Other
            </div>
            <div className="space-y-1 mt-1">
              {otherLinks.map(({ name, to, icon: Icon }, index) => (
                <NavLink
                  key={index}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-inner'
                        : 'hover:bg-gray-200 dark:hover:bg-zinc-700 hover:shadow-md'
                      }`
                  }
                  onClick={handleClose}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-gray-200 dark:border-zinc-700 px-4 py-4">
        {userData.isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border shadow">
              <AvatarImage
                src={userData.avatar}
                alt={userData.username || 'User Avatar'}
              />
              <AvatarFallback>
                {userData.username
                  ? userData.username.charAt(0).toUpperCase()
                  : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-semibold">{userData.username || 'User'}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                {userData.email || 'example@email.com'}
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-muted bg-background shadow hover:scale-105 transition-all"
            onClick={() => {
              navigate('/login');
              handleClose();
            }}
          >
            <UserCircle2 className="w-6 h-6" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;