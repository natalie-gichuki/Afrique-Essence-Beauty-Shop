import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css';
import Profile from './pages/Profile'
import Home from './pages/Home'



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

