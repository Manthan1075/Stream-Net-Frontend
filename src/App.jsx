import Home from "./pages/Home.jsx"
import AppSidebar from "./shared/components/AppSidebar.jsx"
import Layout from "./shared/layout/Layout.jsx"
import { Routes, Route } from 'react-router-dom'
import Signup from "./pages/form/Signup.jsx"
import { Toaster } from "./components/ui/sonner"
import { registerUser } from "./services/auth/authAPI.js"
import Login from "./pages/form/Login.jsx"
import VideoPlayer from "./pages/VideoPlayer.jsx"
import GoogleLogin from "./shared/components/GoogleLogin.jsx"
import { GoogleOAuthProvider } from "@react-oauth/google"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/watch/:videoId" element={<VideoPlayer />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-login" element={
          <GoogleOAuthProvider
            clientId="725548500216-5fa0g8ofgr30h1ugstnpb17ikq5oce0f.apps.googleusercontent.com"
          >
            <GoogleLogin />
          </GoogleOAuthProvider>
        } />
      </Routes>
      <Toaster richColors={true} />
    </>
  )
}

export default App