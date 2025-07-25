// // src/redux/slices/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [], // each item: { id, name, price, quantity, image }
//   total: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { product, quantity } = action.payload;
//       const existingItem = state.items.find(item => item.id === product.id);
//       if (existingItem) {
//         existingItem.quantity += quantity || 1;
//       } else {
//         state.items.push({ ...product, quantity: quantity || 1 });
//       }
//       state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     },

//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//       state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find(item => item.id === id);
//       if (item) item.quantity = quantity;
//       state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     },
//     clearCart: state => {
//       state.items = [];
//       state.total = 0;
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../../services/cartService';

const initialState = {
  carts: [],
  cart: { items: [] },  
  status: 'idle',
  error: null,
};

// Thunks
export const fetchMyCart = createAsyncThunk('cart/fetchMyCart', async (_, thunkAPI) => {
  try {
    return await cartService.getMyCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createCart = createAsyncThunk('cart/createCart', async (_, thunkAPI) => {
  try {
    return await cartService.createCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ cartId, item }, thunkAPI) => {
  try {
    return await cartService.addItem(cartId, item);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

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
