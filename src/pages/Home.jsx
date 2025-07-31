import React from 'react'
import ThemeSelector from '../shared/components/ThemeSwitcher.jsx'
import { useSelector } from 'react-redux'
import { getUserProfile } from '../services/auth/authAPI.js'

function Home() {
    const user = useSelector(state => state.user)
    
    return (
        <div className='h-screen w-screen bg-red-800'>
            <ThemeSelector type='select' />
        </div>
    )
}

export default Home
