import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMapIssues } from '../api/map';

const initialState = {
  issues: [],
  status: 'idle',
  error: null,
};

export const fetchMapIssues = createAsyncThunk(
  'map/fetchMapIssues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMapIssues();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMapIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = action.payload;
      })
      .addCase(fetchMapIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch map issues';
      });
  },
});

export default mapSlice.reducer;