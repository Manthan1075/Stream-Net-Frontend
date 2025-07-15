import { Route, Routes } from "react-router-dom"
import { Home } from './pages'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
    </>
  )
}

export default App
