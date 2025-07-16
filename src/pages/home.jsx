import React from 'react'
import Spinner from '../components/loaders/Spinner.jsx'
import ThemeBtn from '../components/ThemeBtn.jsx'

function home() {

    return (
        <div className='h-screen w-screen bg-amber-50 dark:bg-gray-800 flex items-center justify-center'>
            <ThemeBtn />
            <h3>Home Page</h3>
        </div>
    )
}

export default home
