import API from '../../api/axios';
import {
  CAST_VOTE_REQUEST,
  CAST_VOTE_SUCCESS,
  CAST_VOTE_FAILURE,
  CHECK_VOTE_REQUEST,
  CHECK_VOTE_SUCCESS,
  CHECK_VOTE_FAILURE,
  REMOVE_VOTE_REQUEST,
  REMOVE_VOTE_SUCCESS,
  REMOVE_VOTE_FAILURE
} from '../constants/actionTypes';

// Cast a vote on an issue
export const castVote = (issueId) => async (dispatch) => {
  try {
    dispatch({ type: CAST_VOTE_REQUEST });
    const { data } = await API.post(`/api/vote/issues/${issueId}/upvote`);
    dispatch({
      type: CAST_VOTE_SUCCESS,
      payload: { issueId, vote: data }
    });
    return data;
  } catch (error) {
    dispatch({
      type: CAST_VOTE_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// Check if user has voted on an issue
export const checkUserVote = (issueId) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_VOTE_REQUEST });
    const { data } = await API.get(`/api/vote/issues/${issueId}/vote-status`);
    dispatch({
      type: CHECK_VOTE_SUCCESS,
      payload: { issueId, hasVoted: data.hasVoted }
    });
    return data;
  } catch (error) {
    dispatch({
      type: CHECK_VOTE_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// Remove a vote from an issue
export const removeVote = (issueId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_VOTE_REQUEST });
    const { data } = await API.delete(`/api/vote/issues/${issueId}/vote`);
    dispatch({
      type: REMOVE_VOTE_SUCCESS,
      payload: { issueId }
    });
    return data;
  } catch (error) {
    dispatch({
      type: REMOVE_VOTE_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};


// import API from '../../api/axios';
// import {
//   CAST_VOTE_REQUEST,
//   CAST_VOTE_SUCCESS,
//   CAST_VOTE_FAILURE
// } from '../constants/actionTypes';

// export const castVote = (issueId) => async (dispatch) => {
//   try {
//     dispatch({ type: CAST_VOTE_REQUEST });
//     const { data } = await API.post(`/api/votes/${issueId}`);
//     dispatch({
//       type: CAST_VOTE_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: CAST_VOTE_FAILURE,
//       payload: error.response?.data?.message || error.message
//     });
//   }
// };