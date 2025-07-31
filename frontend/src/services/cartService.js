// import axios from "axios";

// const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5555";

// // Sets the JWT token in headers
// const authHeader = (token) => ({
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// // 📦 Get full cart for the user (GET /cart)
// export const fetchCart = async (token) => {
//   const response = await axios.get(`${API}/cart`, authHeader(token));
//   return response.data;
// };

// // ➕ Add item to cart (POST /cart/:cart_id/items)
// export const addItemToCart = async (cartId, itemData, token) => {
//   const response = await axios.post(`${API}/cart/${cartId}/items`, itemData, authHeader(token));
//   return response.data;
// };

// // 🔁 Update cart item (PUT /cart/items/:item_id)
// export const updateCartItem = async (itemId, updatedData, token) => {
//   const response = await axios.put(`${API}/cart/items/${itemId}`, updatedData, authHeader(token));
//   return response.data;
// };

// // ❌ Remove cart item (DELETE /cart/items/:item_id)
// export const removeCartItem = async (itemId, token) => {
//   await axios.delete(`${API}/cart/items/${itemId}`, authHeader(token));
// };

// // 🧹 Clear entire cart (loop and delete each item)
// export const clearCart = async (cartId, token) => {
//   const cart = await fetchCart(token);
//   const deletions = cart.items.map((item) => removeCartItem(item.id, token));
//   await Promise.all(deletions);
// };

// // 💰 Calculate total price locally
// export const calculateCartTotal = (items) => {
//   return items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
// };


// src/services/cartService.js
import axios from 'axios';
import { API_URL } from '../config';

const CART_URL = `${API_URL}/cart`;

const getToken = () => localStorage.getItem('token');

const authHeaders = () => {
  const token = getToken();
  return token
    ? {
        withCredentials: true, 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    : {}; // or throw an error or redirect to login
};


// Utility to extract user ID from JWT token
const getUserIdFromToken = () => {
  const token = getToken();
  if (!token || token.split('.').length !== 3) {
    throw new Error('Invalid or missing token');
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.sub; // adjust this if your backend uses another field
};

// Fetch the current user's cart
const getMyCart = async () => {
  const res = await axios.get(`${CART_URL}/me`, authHeaders());

  // If backend returns all carts, filter here (not ideal):
  // const carts = res.data;
  // const userId = getUserIdFromToken();
  // const myCart = carts.find(c => c.user_id === parseInt(userId));

  // if (!myCart) {
  //   throw new Error('No cart found for user');
  // }

  return res.data;
};

// Create a new cart
const createCart = async () => {
  const res = await axios.post(`${CART_URL}`, {}, authHeaders());
  return res.data;
};

// Add item to cart
const addItem = async (cartId, item) => {
  const res = await axios.post(`${CART_URL}/${cartId}/items`, item, authHeaders());
  return res.data;
};

// Update an existing item in the cart
const updateItem = async (itemId, data) => {
  const res = await axios.put(`${CART_URL}/items/${itemId}`, data, authHeaders());
  return res.data;
};

// Delete an item from the cart
const deleteItem = async (itemId) => {
  await axios.delete(`${CART_URL}/items/${itemId}`, authHeaders());
};

const cartService = {
  getMyCart,
  createCart,
  addItem,
  updateItem,
  deleteItem,
 
};

export default cartService;
export { authHeaders };
