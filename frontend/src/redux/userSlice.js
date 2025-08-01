import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/UserService';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await userService.getAllUsers();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Failed to fetch users');
    }
  }
);

export const disableUser = createAsyncThunk(
  'users/disable',
  async (userId, thunkAPI) => {
    try {
      await userService.disableUser(userId);
      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Failed to disable user');
    }
  }
);

export const fetchDisabledUsers = createAsyncThunk(
  'users/fetchDisabled',
  async (_, thunkAPI) => {
    try {
      return await userService.getDisabledUsers();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Failed to fetch disabled users');
    }
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    disabledUsers: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.users = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchDisabledUsers.fulfilled, (state, action) => {
        state.disabledUsers = action.payload;
      })
      .addCase(disableUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
