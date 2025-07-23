import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5555";

// Helper to attach token
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 🧾 Create new order (includes optional order_items)
export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API}/orders`, orderData, authHeader(token));
  return response.data;
};

// 📋 Fetch all orders (Admin only)
export const getAllOrders = async (token) => {
  const response = await axios.get(`${API}/orders`, authHeader(token));
  return response.data;
};

// 📄 Fetch a single order by ID
export const getOrderById = async (orderId, token) => {
  const response = await axios.get(`${API}/orders/${orderId}`, authHeader(token));
  return response.data;
};

// ✏️ Update order (Admin only)
export const updateOrder = async (orderId, updatedData, token) => {
  const response = await axios.put(`${API}/orders/${orderId}`, updatedData, authHeader(token));
  return response.data;
};

// ❌ Delete an order (Admin only)
export const deleteOrder = async (orderId, token) => {
  await axios.delete(`${API}/orders/${orderId}`, authHeader(token));
};
 
