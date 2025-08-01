import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../../services/cartService';
import axios from 'axios';
import {authHeaders} from '../../services/cartService'

const CART_URL = 'http://localhost:5555/cart';


const initialState = {
  carts: null,
  cart:  {items : []} ,
  status: 'idle',
  error: null,
};

// Thunks
export const fetchMyCart = createAsyncThunk(
  'cart/fetchMyCart',
  async (_, thunkAPI) => {
    try {
      const cart = await cartService.getMyCart();
      return cart;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Auto-create cart
        const createdCart = await cartService.createCart();
        return createdCart;
      }
      return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch cart');
    }
  }
);


export const createCart = createAsyncThunk('cart/createCart', async (_, thunkAPI) => {
  try {
    return await cartService.createCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data || error.message || 'Unknown error');

  }
});

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item, thunkAPI) => {
    try {
      let cartId;

      // Try to get existing cart
      try {
        const existingCart = await thunkAPI.dispatch(fetchMyCart()).unwrap();
        cartId = existingCart?.id;
      } catch (err) {
        // If no cart, create a new one
        const newCart = await thunkAPI.dispatch(createCart()).unwrap();
        cartId = newCart?.id;
      }

      if (!cartId) throw new Error('Cart ID could not be resolved');

      const res = await axios.post(
        `${CART_URL}/${cartId}/items`,
        item,
        authHeaders()
      );

      return res.data;
    } catch (error) {
      console.error('[addItemToCart Error]', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, data }, thunkAPI) => {
  try {
    return await cartService.updateItem(itemId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (itemId, thunkAPI) => {
  try {
    await cartService.deleteItem(itemId);
    return itemId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchMyCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(createCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(addItemToCart.fulfilled, (state, action) => {
        if (!state.cart) {
          state.cart = { items: [] };
        }
        if (!state.cart.items) {
          state.cart.items = [];
        }
        state.cart.items.push(action.payload);
      })


      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.cart.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.cart.items[index] = action.payload;
        }
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;


