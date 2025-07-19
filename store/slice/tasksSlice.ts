import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, completeTask } from '../../services/tasksService'

export const loadTasks = createAsyncThunk('tasks/loadTasks', async (type: string) => {
  const { data } = await fetchTasks(type);
  return data;
});

export const markTaskComplete = createAsyncThunk(
  'tasks/markComplete',
  async ({ taskId, proof }: { taskId: number; proof: object }) => {
    const { data } = await completeTask(taskId, proof);
    return { taskId, reward: data.reward };
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTasks.fulfilled, (state: any, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadTasks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default tasksSlice.reducer;