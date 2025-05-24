import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { castVote, checkVote } from '../api/votes';

const initialState = {
  votedIssues: [],
  status: 'idle',
  error: null,
};

export const voteOnIssue = createAsyncThunk(
  'votes/voteOnIssue',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await castVote(issueId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkUserVote = createAsyncThunk(
  'votes/checkUserVote',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await checkVote(issueId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const voteSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(voteOnIssue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(voteOnIssue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (!state.votedIssues.includes(action.payload.issueId)) {
          state.votedIssues.push(action.payload.issueId);
        }
      })
      .addCase(voteOnIssue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to cast vote';
      })
      .addCase(checkUserVote.fulfilled, (state, action) => {
        if (action.payload.hasVoted) {
          state.votedIssues.push(action.payload.issueId);
        }
      });
  },
});

export default voteSlice.reducer;