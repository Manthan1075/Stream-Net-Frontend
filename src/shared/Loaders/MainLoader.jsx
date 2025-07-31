import React from 'react'
import '../../App.css'

function MainLoader() {
    return (
        <div className='h-screen w-screen bg-white flex flex-col items-center justify-center'>
            <div className="equalizer-container mb-4">
                <div className="bar" style={{ animationDelay: '0s' }}></div>
                <div className="bar" style={{ animationDelay: '0.1s' }}></div>
                <div className="bar" style={{ animationDelay: '0.2s' }}></div>
                <div className="bar" style={{ animationDelay: '0.3s' }}></div>
                <div className="bar" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-gray-700 text-base tracking-wide font-medium animate-pulse" style={{ letterSpacing: '0.1em' }}>
                Loading, please wait...
            </span>
        </div>
    )
}

export default MainLoader
