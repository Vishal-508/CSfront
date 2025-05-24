import API from '../../api/axios';
import {
  FETCH_MAP_ISSUES_REQUEST,
  FETCH_MAP_ISSUES_SUCCESS,
  FETCH_MAP_ISSUES_FAILURE
} from '../constants/actionTypes';

export const fetchMapIssues = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MAP_ISSUES_REQUEST });
    const { data } = await API.get('/api/map');
    dispatch({
      type: FETCH_MAP_ISSUES_SUCCESS,
      payload: data.issues || []
    });
  } catch (error) {
    dispatch({
      type: FETCH_MAP_ISSUES_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};