// redux/actions/analyticsActions.js
import API from '../../api/axios';
import {
  FETCH_CATEGORY_ANALYTICS_REQUEST,  FETCH_CATEGORY_ANALYTICS_SUCCESS,  FETCH_CATEGORY_ANALYTICS_FAILURE,
  FETCH_SUBMISSION_ANALYTICS_REQUEST, FETCH_SUBMISSION_ANALYTICS_SUCCESS, FETCH_SUBMISSION_ANALYTICS_FAILURE,
  FETCH_MOST_VOTED_ANALYTICS_REQUEST, FETCH_MOST_VOTED_ANALYTICS_SUCCESS, FETCH_MOST_VOTED_ANALYTICS_FAILURE,
} from '../constants/actionTypes';

// ---------- category‑count ----------
export const fetchCategoryAnalytics = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORY_ANALYTICS_REQUEST });
  try {
    const res = await API.get('/api/analytics/category-count');
    dispatch({
      type   : FETCH_CATEGORY_ANALYTICS_SUCCESS,
      payload: res.data.data,           // ← just the array
    });
  } catch (error) {
    dispatch({
      type   : FETCH_CATEGORY_ANALYTICS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------- daily‑submissions ----------
export const fetchSubmissionAnalytics = () => async (dispatch) => {
  dispatch({ type: FETCH_SUBMISSION_ANALYTICS_REQUEST });
  try {
    const res = await API.get('/api/analytics/daily-submissions');
    dispatch({
      type   : FETCH_SUBMISSION_ANALYTICS_SUCCESS,
      payload: res.data.data,           // ← array [{ count, date }]
    });
  } catch (error) {
    dispatch({
      type   : FETCH_SUBMISSION_ANALYTICS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------- most‑voted ----------
export const fetchMostVotedAnalytics = () => async (dispatch) => {
  dispatch({ type: FETCH_MOST_VOTED_ANALYTICS_REQUEST });
  try {
    const res = await API.get('/api/analytics/most-voted');

    // API: [{ category:"Road", topIssues:[{ id, title, voteCount, status }, ...] }]
    const flat = res.data.data.flatMap((cat) =>
      cat.topIssues.map((issue) => ({
        _id     : issue.id,
        category: cat.category,
        title   : issue.title,
        votes   : issue.voteCount,
        status  : issue.status,
      }))
    );

    dispatch({
      type   : FETCH_MOST_VOTED_ANALYTICS_SUCCESS,
      payload: flat,                    // ← clean flat array
    });
  } catch (error) {
    dispatch({
      type   : FETCH_MOST_VOTED_ANALYTICS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};




// import API from '../../api/axios';
// import {
//   FETCH_CATEGORY_ANALYTICS_REQUEST,
//   FETCH_CATEGORY_ANALYTICS_SUCCESS,
//   FETCH_CATEGORY_ANALYTICS_FAILURE,
//   FETCH_SUBMISSION_ANALYTICS_REQUEST,
//   FETCH_SUBMISSION_ANALYTICS_SUCCESS,
//   FETCH_SUBMISSION_ANALYTICS_FAILURE,
//   FETCH_MOST_VOTED_ANALYTICS_REQUEST,
//   FETCH_MOST_VOTED_ANALYTICS_SUCCESS,
//   FETCH_MOST_VOTED_ANALYTICS_FAILURE
// } from '../constants/actionTypes';

// export const fetchCategoryAnalytics = () => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_CATEGORY_ANALYTICS_REQUEST });
//     const { data } = await API.get('/api/analytics/category-count');
//     dispatch({
//       type: FETCH_CATEGORY_ANALYTICS_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_CATEGORY_ANALYTICS_FAILURE,
//       payload: error.response?.data?.message || error.message
//     });
//   }
// };

// export const fetchSubmissionAnalytics = () => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_SUBMISSION_ANALYTICS_REQUEST });
//     const { data } = await API.get('/api/analytics/daily-submissions');
//     dispatch({
//       type: FETCH_SUBMISSION_ANALYTICS_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_SUBMISSION_ANALYTICS_FAILURE,
//       payload: error.response?.data?.message || error.message
//     });
//   }
// };

// export const fetchMostVotedAnalytics = () => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_MOST_VOTED_ANALYTICS_REQUEST });
//     const { data } = await API.get('/api/analytics/most-voted');
//     dispatch({
//       type: FETCH_MOST_VOTED_ANALYTICS_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_MOST_VOTED_ANALYTICS_FAILURE,
//       payload: error.response?.data?.message || error.message
//     });
//   }
// };