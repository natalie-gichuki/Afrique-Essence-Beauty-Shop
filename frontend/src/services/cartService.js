import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5555";

// Sets the JWT token in headers
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 📦 Get full cart for the user (GET /cart)
export const fetchCart = async (token) => {
  const response = await axios.get(`${API}/cart`, authHeader(token));
  return response.data;
};

// ➕ Add item to cart (POST /cart/:cart_id/items)
export const addItemToCart = async (cartId, itemData, token) => {
  const response = await axios.post(`${API}/cart/${cartId}/items`, itemData, authHeader(token));
  return response.data;
};

// 🔁 Update cart item (PUT /cart/items/:item_id)
export const updateCartItem = async (itemId, updatedData, token) => {
  const response = await axios.put(`${API}/cart/items/${itemId}`, updatedData, authHeader(token));
  return response.data;
};

// ❌ Remove cart item (DELETE /cart/items/:item_id)
export const removeCartItem = async (itemId, token) => {
  await axios.delete(`${API}/cart/items/${itemId}`, authHeader(token));
};

// 🧹 Clear entire cart (loop and delete each item)
export const clearCart = async (cartId, token) => {
  const cart = await fetchCart(token);
  const deletions = cart.items.map((item) => removeCartItem(item.id, token));
  await Promise.all(deletions);
};

// 💰 Calculate total price locally
export const calculateCartTotal = (items) => {
  return items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
};
