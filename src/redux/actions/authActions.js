import API from '../../api/axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
    LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/actionTypes';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await API.post('/api/auth/login', credentials);
    localStorage.setItem('token', data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const { data } = await API.post('/api/auth/register', userData);
    localStorage.setItem('token', data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

// export const logout = () => (dispatch) => {
//   localStorage.removeItem('token');
//   dispatch({ type: LOGOUT });
// };

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });

  try {
    // 1️⃣ tell the backend to invalidate the token/session
    await API.get('/api/auth/logout');      // baseURL handles http://localhost:3000

    // 2️⃣ client‑side cleanup
    localStorage.removeItem('token');

    dispatch({ type: LOGOUT_SUCCESS });      // payload not needed
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};