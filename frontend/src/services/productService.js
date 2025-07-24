import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

// Set up axios instance with default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  // Get all products with optional filtering and pagination
  async getProducts({ category, page = 1, limit = 10 }) {
    const params = { page, limit };
    if (category) params.category = category;
    
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  async createProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update existing product
  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  async deleteProduct(id) {
    await api.delete(`/products/${id}`);
  },

  // Get all categories
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  }
};

export default productService;