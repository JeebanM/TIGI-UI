import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { checkIn, CheckInResponse } from '../../services/checkInService';

interface CheckInState {
  streak: number;
  reward: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CheckInState = {
  streak: 0,
  reward: 0,
  status: 'idle',
};

export const claimCheckIn = createAsyncThunk<
  CheckInResponse,     // return type on success
  void,                // argument type
  { rejectValue: string }
>(
  'checkin/claim',
  async (_: void, thunkAPI) => {
    try {
      return await checkIn();
    } catch (err) {
      return thunkAPI.rejectWithValue('Check-in failed');
    }
  }
);

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {
    setStreak(state, action: PayloadAction<number>) {
      state.streak = action.payload;
    },
    resetCheckIn(state) {
      state.streak = 0;
      state.reward = 0;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(claimCheckIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(claimCheckIn.fulfilled, (state, action: PayloadAction<CheckInResponse>) => {
        state.streak = action.payload.streak;
        state.reward = action.payload.reward;
        state.status = 'succeeded';
      })
      .addCase(claimCheckIn.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetCheckIn, setStreak } = checkInSlice.actions;
export default checkInSlice.reducer;
