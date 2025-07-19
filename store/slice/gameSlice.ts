// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { tap } from '../../services/gameService';

// export const sendTap = createAsyncThunk('game/tap', async (tapCount: number) => {
//   const { data } = await tap(tapCount);
//   return data;
// });

// const gameSlice = createSlice({
//   name: 'game',
//   initialState: { points: 0, status: 'idle' },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendTap.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(sendTap.fulfilled, (state, action) => {
//         state.points = action.payload.newBalance;
//         state.status = 'succeeded';
//       })
//       .addCase(sendTap.rejected, (state) => {
//         state.status = 'failed';
//       });
//   },
// });

// export default gameSlice.reducer;

// src/store/slice/gameSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {tap} from "@/services/gameService";

export const doTap = createAsyncThunk<
  { newBalance: number },
  number,
  { rejectValue: string }
>(
  "game/doTap",
  async (tapCount, thunkAPI) => {
    try {
      const res = await tap(tapCount);
      return { newBalance: res.data.newBalance };
    } catch {
      return thunkAPI.rejectWithValue("Tap failed");
    }
  }
);

interface GameState {
  balance: number;
  status: "idle" | "loading" | "failed";
}

const initialState: GameState = {
  balance: 0,
  status: "idle",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(doTap.pending, (s) => {
        s.status = "loading";
      })
      .addCase(doTap.fulfilled, (s, a: PayloadAction<{ newBalance: number }>) => {
        s.balance = a.payload.newBalance;
        s.status = "idle";
      })
      .addCase(doTap.rejected, (s) => {
        s.status = "failed";
      }),
});

export default gameSlice.reducer;

