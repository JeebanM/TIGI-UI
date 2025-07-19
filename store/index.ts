import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import gameReducer from "./slice/gameSlice";
import tasksReducer from "./slice/tasksSlice";
import checkInReducer from "./slice/checkInSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    game: gameReducer,
    tasks: tasksReducer,
    checkIn: checkInReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
