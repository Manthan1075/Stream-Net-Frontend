import Home from "./pages/home.jsx"
import AppSidebar from "./shared/components/AppSidebar.jsx"
import Layout from "./shared/layout/Layout.jsx"
import { Routes, Route } from 'react-router-dom'
import Signup from "./pages/form/Signup.jsx"
import { Toaster } from "./components/ui/sonner"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster richColors={true} />

    </div>
  )
}



export default App