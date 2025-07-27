// import { createSlice } from '@reduxjs/toolkit';

// // Initial state for orders
// const initialState = {
//   orders: [],
//   loading: false,
//   error: null,
// };

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     fetchOrdersStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchOrdersSuccess: (state, action) => {
//       state.orders = action.payload;
//       state.loading = false;
//     },
//     fetchOrdersFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const {
//   fetchOrdersStart,
//   fetchOrdersSuccess,
//   fetchOrdersFailure,
// } = orderSlice.actions;

// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

// Initial state
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk: Create order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload || 'Failed to create order';
      });
  },
});

// Exports
export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
