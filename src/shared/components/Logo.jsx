import React from 'react'
import { CirclePlay } from 'lucide-react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

const sizeMap = {
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
}

const textSizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
}

function Logo({ size = 'md', className = '', isDarkMode, ...props }) {

    const DarkMode = isDarkMode || useSelector(state => state.ui.darkMode)

    const iconSize = sizeMap[size] || sizeMap['md']
    const textSize = textSizeMap[size] || textSizeMap['md']
    const textColor = DarkMode ? 'text-white' : 'text-zinc-900'
    const netTextColor = DarkMode ? 'text-white' : 'text-zinc-900'
    const iconColor = DarkMode ? 'text-violet-400' : 'text-primary'

    return (
        <div
            className={clsx(
                ' select-none flex items-center gap-1 font-semibold font-lato tracking-wider',
                textColor,
                textSize,
                className
            )}
            {...props}
        >
            <a href="/" className="flex items-center gap-1">
                <span className="font-bold">Stream</span>
                <CirclePlay size={iconSize} className={iconColor} />
                <span className={netTextColor}>Net</span>
            </a>
        </div>
    )
}

export default Logo
