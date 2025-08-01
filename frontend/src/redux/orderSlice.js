import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

// -----------------------------
// Initial state
// -----------------------------
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

// -----------------------------
// Async thunks
// -----------------------------

// Create an order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || 'Failed to create order');
    }
  }
);

// Fetch all my orders
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || 'Failed to fetch orders');
    }
  }
);

// Fetch one order by ID
export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || 'Failed to fetch order');
    }
  }
);

// -----------------------------
// Slice
// -----------------------------
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch one order
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// -----------------------------
// Export
// -----------------------------
export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} = orderSlice.actions;
export default orderSlice.reducer;
