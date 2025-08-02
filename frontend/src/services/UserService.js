// import { API_URL } from "../config";

// // Helper function to handle authenticated requests
// const authFetch = async (url, options = {}) => {
//   const token = localStorage.getItem('token');
  
//   const headers = {
//     'Content-Type': 'application/json',
//     ...options.headers
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const response = await fetch(`${API_URL}${url}`, {
//     ...options,
//     headers
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.msg || 'Request failed');
//   }

//   return response.json();
// };

// // Get all users (admin only)
// export const getUsers = async () => {
//   try {
//     const data = await authFetch('/user');
//     return Array.isArray(data) ? data : []; // Ensure we always return an array
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//     throw error;
//   }
// };

// // Disable a user account (admin only)
// export const disableUser = async (userId) => {
//   try {
//     return await authFetch(`/user/${userId}/disabled`, {
//       method: 'PATCH'
//     });
//   } catch (error) {
//     console.error('Failed to disable user:', error);
//     throw error;
//   }
// };

// // (Optional) Enable a user account
// export const enableUser = async (userId) => {
//   try {
//     return await authFetch(`/user/${userId}/enable`, { // You'll need to implement this endpoint
//       method: 'PATCH'
//     });
//   } catch (error) {
//     console.error('Failed to enable user:', error);
//     throw error;
//   }
// };

// // (Optional) Update user role
// export const updateUserRole = async (userId, newRole) => {
//   try {
//     return await authFetch(`/user/${userId}/role`, {
//       method: 'PATCH',
//       body: JSON.stringify({ role: newRole })
//     });
//   } catch (error) {
//     console.error('Failed to update user role:', error);
//     throw error;
//   }
// };

// export default {
//   getUsers,
//   disableUser,
//   enableUser,
//   updateUserRole
// };

import axios from 'axios';
import authService  from './authService';

const API_URL = 'https://afrique-essence-beauty-shop.onrender.com/users/user';

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${authService.getToken()}`,
  },
});

const getAllUsers = async () => {
  const res = await axios.get(API_URL, authHeaders());
  return res.data;
};

const disableUser = async (userId) => {
  const res = await axios.patch(`${API_URL}/${userId}/disabled`, {}, authHeaders());
  return res.data;
};

const getDisabledUsers = async () => {
  const res = await axios.get('https://afrique-essence-beauty-shop.onrender.com/users/users/disabled', authHeaders());
  return res.data;
};

const userService = {
  getAllUsers,
  disableUser,
  getDisabledUsers
};

export default userService;
