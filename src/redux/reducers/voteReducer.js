import {
  CAST_VOTE_REQUEST,
  CAST_VOTE_SUCCESS,
  CAST_VOTE_FAILURE
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  error: null,
  votedIssues: []
};

 const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAST_VOTE_REQUEST:
      return { ...state, loading: true, error: null };
    
    case CAST_VOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        votedIssues: [...state.votedIssues, action.payload.issueId]
      };
    
    case CAST_VOTE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export default voteReducer;