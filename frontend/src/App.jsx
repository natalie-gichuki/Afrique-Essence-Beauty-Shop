import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Order from './pages/Orders';

import InvoicePage from './pages/InvoicePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminAnalytics from './pages/Admin/AdminAnalytics';
// import { Layout } from 'lucide-react';
import Layout from './components/layout'


function App() {
  return (
    <Routes>
      {/* Wrap public and protected pages with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <InvoicePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}




export default App;
