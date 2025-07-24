// import { createSlice } from '@reduxjs/toolkit';

// // Initial product state
// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     // Start loading products
//     fetchProductsStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     // On successful product fetch
//     fetchProductsSuccess: (state, action) => {
//       state.products = action.payload;
//       state.loading = false;
//     },
//     // On product fetch error
//     fetchProductsFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const {
//   fetchProductsStart,
//   fetchProductsSuccess,
//   fetchProductsFailure,
// } = productSlice.actions;

// export default productSlice.reducer;

// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async ({ productData, token }, thunkAPI) => {
    try {
      return await createProduct(productData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/edit',
  async ({ productId, productData, token }, thunkAPI) => {
    try {
      return await updateProduct(productId, productData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'products/delete',
  async ({ productId, token }, thunkAPI) => {
    try {
      await deleteProduct(productId, token);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
