import API from '../../api/axios';
import {
  CAST_VOTE_REQUEST,
  CAST_VOTE_SUCCESS,
  CAST_VOTE_FAILURE
} from '../constants/actionTypes';

export const castVote = (issueId) => async (dispatch) => {
  try {
    dispatch({ type: CAST_VOTE_REQUEST });
    const { data } = await API.post(`/api/votes/${issueId}`);
    dispatch({
      type: CAST_VOTE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CAST_VOTE_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};