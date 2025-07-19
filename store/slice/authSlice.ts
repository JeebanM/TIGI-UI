import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { telegramLogin } from '../../services/authApi';

interface AuthState {
  token: string;
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  token: '',
  user: null,
  status: 'idle',
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ raw }: { raw: any }, thunkAPI) => {
    try {
      const res = await telegramLogin(raw);
      localStorage.setItem('accessToken', res.data.accessToken);
      return { token: res.data.accessToken, user: res.data.user };
    } catch (err) {
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = null;
      state.status = 'idle';
      localStorage.removeItem('accessToken');
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token || '';
      if (action.payload.token) {
        localStorage.setItem('accessToken', action.payload.token);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

