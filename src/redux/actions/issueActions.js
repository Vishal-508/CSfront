import API from '../../api/axios';
import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAILURE,
  FETCH_USER_ISSUES_REQUEST,
  FETCH_USER_ISSUES_SUCCESS,
  FETCH_USER_ISSUES_FAILURE,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  DELETE_ISSUE_REQUEST,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE_FAILURE,
  FETCH_ISSUE_BY_ID_REQUEST,
  FETCH_ISSUE_BY_ID_SUCCESS,
  FETCH_ISSUE_BY_ID_FAILURE,
  CLEAR_CURRENT_ISSUE
} from '../constants/actionTypes';

// Fetch all issues with pagination/filters
export const fetchIssues = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ISSUES_REQUEST });
    const { data } = await API.get('/api/issues', { params });

    dispatch({
      type: FETCH_ISSUES_SUCCESS,
      payload: {
        issues: data.data.issues || [],
        pagination: {
          page: data.data.page,
          totalPages: data.data.totalPages,
          totalItems: data.data.total
        }
      }
    });
  } catch (error) {
    dispatch({
      type: FETCH_ISSUES_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Fetch issues created by current user
export const fetchUserIssues = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_ISSUES_REQUEST });

    const res = await API.get('/api/issues/user');

    // unwrap the nested structure safely
    const issues = res.data?.data?.issues ?? [];

    dispatch({
      type: FETCH_USER_ISSUES_SUCCESS,
      payload: issues,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ISSUES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch single issue by ID
// redux/actions/issueActions.js
export const fetchIssueById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUE_BY_ID_REQUEST });

  try {
    const res   = await API.get(`/api/issues/${id}`);
    const issue = res.data?.data;                 // <-- unwrap the envelope

    // normalise so the UI doesn’t need changing everywhere
    const normalised = {
      ...issue,
      image: issue.imageUrl,          // DetailImage expects image
      votes: issue.voteCount,         // Vote button expects votes
    };

    dispatch({
      type   : FETCH_ISSUE_BY_ID_SUCCESS,
      payload: normalised,
    });
  } catch (error) {
    dispatch({
      type   : FETCH_ISSUE_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// export const fetchIssueById = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_ISSUE_BY_ID_REQUEST });
//     const { data } = await API.get(`/api/issues/${id}`);
//     dispatch({
//       type: FETCH_ISSUE_BY_ID_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_ISSUE_BY_ID_FAILURE,
//       payload: error.response?.data?.message || error.message
//     });
//   }
// };

// Clear current issue from state
export const clearCurrentIssue = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_ISSUE });
};

// Create new issue
export const createIssue = (issueData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ISSUE_REQUEST });
    const formData = new FormData();
    Object.keys(issueData).forEach(key => formData.append(key, issueData[key]));
    const { data } = await API.post('/api/issues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch({
      type: CREATE_ISSUE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CREATE_ISSUE_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Delete an issue
export const deleteIssue = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ISSUE_REQUEST });
    await API.delete(`/api/issues/${id}`);
    dispatch({
      type: DELETE_ISSUE_SUCCESS,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: DELETE_ISSUE_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};