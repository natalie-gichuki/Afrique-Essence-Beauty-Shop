// services/categoryService.js
import axios from 'axios';
import { API_URL } from '../config';

export const getAllCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};
