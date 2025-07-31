import Home from "./pages/Home.jsx"
import AppSidebar from "./shared/components/AppSidebar.jsx"
import Layout from "./shared/layout/Layout.jsx"
import { Routes, Route } from 'react-router-dom'
import Signup from "./pages/form/Signup.jsx"
import { Toaster } from "./components/ui/sonner"
import { registerUser } from "./services/auth/authAPI.js"
import Login from "./pages/form/Login.jsx"
import SplashScreen from "./shared/SplashScreen.jsx"


function App() {

  return (
    <>
      <SplashScreen />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster richColors={true} />
    </>
  )
}



export default App