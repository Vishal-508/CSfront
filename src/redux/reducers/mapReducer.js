import {
  FETCH_MAP_ISSUES_REQUEST,
  FETCH_MAP_ISSUES_SUCCESS,
  FETCH_MAP_ISSUES_FAILURE
} from '../constants/actionTypes';

const initialState = {
  issues: [],
  loading: false,
  error: null
};

 const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAP_ISSUES_REQUEST:
      return { ...state, loading: true, error: null };
    
    case FETCH_MAP_ISSUES_SUCCESS:
      return { ...state, loading: false, issues: action.payload };
    
    case FETCH_MAP_ISSUES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export default mapReducer;