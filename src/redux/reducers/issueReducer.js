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
  FETCH_ISSUE_BY_ID_REQUEST,
  FETCH_ISSUE_BY_ID_SUCCESS,
  FETCH_ISSUE_BY_ID_FAILURE,
  CLEAR_CURRENT_ISSUE,
  DELETE_ISSUE_REQUEST,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE_FAILURE
} from '../constants/actionTypes';

const initialState = {
  issues: [],
  userIssues: [],
  currentIssue: null, // Added for single issue view
  loading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalItems: 0
  }
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
    case FETCH_USER_ISSUES_REQUEST:
    case CREATE_ISSUE_REQUEST:
    case FETCH_ISSUE_BY_ID_REQUEST:
    case DELETE_ISSUE_REQUEST:
      return { ...state, loading: true, error: null };
    
    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.payload.issues,
        pagination: action.payload.pagination
      };
    
    case FETCH_USER_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        userIssues: action.payload
      };
    
    case CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [action.payload, ...state.issues],
        userIssues: [action.payload, ...state.userIssues]
      };
    
    case FETCH_ISSUE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentIssue: action.payload
      };
    
    case DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.filter(issue => issue._id !== action.payload),
        userIssues: state.userIssues.filter(issue => issue._id !== action.payload),
        // Clear current issue if it's the one being deleted
        currentIssue: state.currentIssue?._id === action.payload ? null : state.currentIssue
      };
    
    case CLEAR_CURRENT_ISSUE:
      return {
        ...state,
        currentIssue: null
      };
    
    case FETCH_ISSUES_FAILURE:
    case FETCH_USER_ISSUES_FAILURE:
    case CREATE_ISSUE_FAILURE:
    case FETCH_ISSUE_BY_ID_FAILURE:
    case DELETE_ISSUE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export default issueReducer;