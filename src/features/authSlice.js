import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, 
    // getMe

 } from '../api/auth';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const fetchCurrentUser = createAsyncThunk(
//   'auth/me',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getMe();
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
    //   .addCase(fetchCurrentUser.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchCurrentUser.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.user = action.payload;
    //   })
    //   .addCase(fetchCurrentUser.rejected, (state) => {
    //     state.status = 'failed';
    //     state.user = null;
    //   });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;