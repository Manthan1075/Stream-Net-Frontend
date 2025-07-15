import React from 'react'
import Logo from '../components/Logo.jsx'
import Signup from './Signup.jsx'

function home() {
    return (

        <div className='bg-black'>
            <Logo size={"md"} isDarkMode={true} />
            <Signup />
        </div>
    )
}

export default home
