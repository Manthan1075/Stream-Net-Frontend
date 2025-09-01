import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function GoogleLoginButton() {
    const googleLogin = useGoogleLogin({
        flow: "implicit",
        onSuccess: async (response) => {
            try {
                const userInfo = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                )
                console.log("User info:", userInfo.data)
            } catch (err) {
                console.error(err)
            }
        },
        onError: (error) => console.log(error),
    })

    return (
        <div>
            <button onClick={() => googleLogin()}>
                Google Login
            </button>
        </div>
    )
}

export default GoogleLoginButton
