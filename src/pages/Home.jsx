import React from 'react'
import ThemeSelector from '../shared/components/ThemeSwitcher.jsx'

function Home() {
    return (
        <div>
            <ThemeSelector type='select' />
            <h3>hey This Is Home</h3>
        </div>
    )
}

export default Home
