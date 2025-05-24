import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoryAnalytics,
  getSubmissionAnalytics,
  getMostVotedAnalytics,
} from '../api/analytics';

const initialState = {
  categories: [],
  submissions: [],
  mostVoted: [],
  status: 'idle',
  error: null,
};




export const fetchCategoryAnalytics = createAsyncThunk(
  'analytics/fetchCategoryAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategoryAnalytics();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSubmissionAnalytics = createAsyncThunk(
  'analytics/fetchSubmissionAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSubmissionAnalytics();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchMostVotedAnalytics = createAsyncThunk(
  'analytics/fetchMostVotedAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMostVotedAnalytics();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategoryAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch category analytics';
      })
      .addCase(fetchSubmissionAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubmissionAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissionAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch submission analytics';
      })
      .addCase(fetchMostVotedAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMostVotedAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mostVoted = action.payload;
      })
      .addCase(fetchMostVotedAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch most voted analytics';
      });
  },
});

export default analyticsSlice.reducer;