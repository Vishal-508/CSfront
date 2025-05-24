import {
  FETCH_CATEGORY_ANALYTICS_REQUEST,
  FETCH_CATEGORY_ANALYTICS_SUCCESS,
  FETCH_CATEGORY_ANALYTICS_FAILURE,
  FETCH_SUBMISSION_ANALYTICS_REQUEST,
  FETCH_SUBMISSION_ANALYTICS_SUCCESS,
  FETCH_SUBMISSION_ANALYTICS_FAILURE,
  FETCH_MOST_VOTED_ANALYTICS_REQUEST,
  FETCH_MOST_VOTED_ANALYTICS_SUCCESS,
  FETCH_MOST_VOTED_ANALYTICS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  categories: [],
  submissions: [],
  mostVoted: [],
  loading: false,
  error: null
};

 const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_ANALYTICS_REQUEST:
    case FETCH_SUBMISSION_ANALYTICS_REQUEST:
    case FETCH_MOST_VOTED_ANALYTICS_REQUEST:
      return { ...state, loading: true, error: null };
    
    case FETCH_CATEGORY_ANALYTICS_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    
    case FETCH_SUBMISSION_ANALYTICS_SUCCESS:
      return { ...state, loading: false, submissions: action.payload };
    
    case FETCH_MOST_VOTED_ANALYTICS_SUCCESS:
      return { ...state, loading: false, mostVoted: action.payload };
    
    case FETCH_CATEGORY_ANALYTICS_FAILURE:
    case FETCH_SUBMISSION_ANALYTICS_FAILURE:
    case FETCH_MOST_VOTED_ANALYTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
};


export default analyticsReducer;