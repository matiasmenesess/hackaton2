import { useState } from 'react'
import './App.css'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom'
  import Register  from './pages/Register'
  import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />

      </Routes>
      </Router>
    </>
  )
}

export default App
