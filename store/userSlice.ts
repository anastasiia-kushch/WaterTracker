import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser, addLog } from '../api';

export interface UserState {
  userName: string;
  nickName: string;
  goal: number;
  drunk: number;
  logs: Record<string, number[]>;
  id: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userName: '',
  nickName: '',
  goal: 0,
  drunk: 0,
  logs: {},
  id: '',
  status: 'idle',
  error: null,
};

export const fetchUserData = createAsyncThunk('user/fetchUser', async () => {
  const data = await fetchUser();
  return data;
});

export const addLogToUser = createAsyncThunk(
  'user/addLog',
  async (amount: number) => {
    const data = await addLog(amount);
    return data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.userName = action.payload.userName;
        state.nickName = action.payload.nickName;
        state.goal = action.payload.goal;
        state.drunk = action.payload.drunk;
        state.logs = action.payload.logs;
        state.id = action.payload.id;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(addLogToUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addLogToUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.userName = action.payload.userName;
        state.nickName = action.payload.nickName;
        state.goal = action.payload.goal;
        state.drunk = action.payload.drunk;
        state.logs = action.payload.logs;
        state.id = action.payload.id;
      })
      .addCase(addLogToUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add log';
      });
  },
});

export default userSlice.reducer;
