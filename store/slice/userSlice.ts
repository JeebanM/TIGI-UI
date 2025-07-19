import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  accessToken: string | null;
  user: any | null;
}

const initialState: UserState = {
  accessToken: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ accessToken: string, user : [] }>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      if (action.payload.accessToken) {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
    clearUser(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
