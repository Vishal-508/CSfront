import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createIssue,
  getIssues,
  getUserIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from '../api/issues';

const initialState = {
  issues: [],
  userIssues: [],
  currentIssue: null,
  status: 'idle',
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getIssues(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserIssues = createAsyncThunk(
  'issues/fetchUserIssues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserIssues();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchIssueById = createAsyncThunk(
  'issues/fetchIssueById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getIssueById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addIssue = createAsyncThunk(
  'issues/addIssue',
  async (issueData, { rejectWithValue }) => {
    try {
      const response = await createIssue(issueData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editIssue = createAsyncThunk(
  'issues/editIssue',
  async ({ id, issueData }, { rejectWithValue }) => {
    try {
      const response = await updateIssue(id, issueData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeIssue = createAsyncThunk(
  'issues/removeIssue',
  async (id, { rejectWithValue }) => {
    try {
      await deleteIssue(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    clearCurrentIssue: (state) => {
      state.currentIssue = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = action.payload.issues;
        state.pagination = {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        };
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch issues';
      })
      .addCase(fetchUserIssues.pending, (state) => {
        state.status = 'loading';
      })
    .addCase(fetchUserIssues.fulfilled, (state, action) => {
        state.userIssues = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUserIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch user issues';
      })
      .addCase(fetchIssueById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentIssue = action.payload;
      })
      .addCase(fetchIssueById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch issue';
      })
      .addCase(addIssue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addIssue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues.unshift(action.payload);
        state.userIssues.unshift(action.payload);
      })
      .addCase(addIssue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to add issue';
      })
      .addCase(editIssue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editIssue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = state.issues.map((issue) =>
          issue._id === action.payload._id ? action.payload : issue
        );
        state.userIssues = state.userIssues.map((issue) =>
          issue._id === action.payload._id ? action.payload : issue
        );
        if (state.currentIssue?._id === action.payload._id) {
          state.currentIssue = action.payload;
        }
      })
      .addCase(editIssue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update issue';
      })
      .addCase(removeIssue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeIssue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = state.issues.filter((issue) => issue._id !== action.payload);
        state.userIssues = state.userIssues.filter(
          (issue) => issue._id !== action.payload
        );
        if (state.currentIssue?._id === action.payload) {
          state.currentIssue = null;
        }
      })
      .addCase(removeIssue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete issue';
      });
  },
});

export const { clearCurrentIssue } = issueSlice.actions;
export default issueSlice.reducer;