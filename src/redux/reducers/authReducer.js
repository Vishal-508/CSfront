import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  LOGOUT_REQUEST,  LOGOUT_SUCCESS,  LOGOUT_FAILURE
} from '../constants/actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

 const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload
      };
    // logout ----------------------------------------------------------------
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGOUT_SUCCESS:
      return { ...state, loading: false, user: null, isAuthenticated: false, error: null };

    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default authReducer;