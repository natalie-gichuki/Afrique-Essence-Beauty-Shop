// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5555/api'; // Update with your backend URL

// // Set up axios instance with default headers
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor to include JWT token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('jwtToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const productService = {
//   // Get all products with optional filtering and pagination
//   async getProducts({ category, page = 1, limit = 10 }) {
//     const params = { page, limit };
//     if (category) params.category = category;
    
//     const response = await api.get('/products', { params });
//     return response.data;
//   },

//   // Get single product by ID
//   async getProductById(id) {
//     const response = await api.get(`/products/${id}`);
//     return response.data;
//   },

//   // Create new product
//   async createProduct(productData) {
//     const response = await api.post('/products', productData);
//     return response.data;
//   },

//   // Update existing product
//   async updateProduct(id, productData) {
//     const response = await api.put(`/products/${id}`, productData);
//     return response.data;
//   },

//   // Delete product
//   async deleteProduct(id) {
//     await api.delete(`/products/${id}`);
//   },

//   // Get all categories
//   async getCategories() {
//     const response = await api.get('/categories');
//     return response.data;
//   }
// };

// export default productService;

// src/services/productService.js
import { API_URL } from "../config";

const BASE_URL = `${API_URL}/products`;

const getAllProducts = async (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch products');
  }

  return await res.json();
};

const getProductById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch product');
  }

  return await res.json();
};

const createProduct = async (productData, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create product');
  }

  return await res.json();
};

const updateProduct = async (id, productData, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update product');
  }

  return await res.json();
};

const deleteProduct = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete product');
  }
};

export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

export default productService;