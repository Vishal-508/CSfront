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

const initialState = {
  loading: false,
  error: null,
  votedIssues: {}, // Object with issueId as key and vote status as value
  checkingVote: false
};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAST_VOTE_REQUEST:
    case REMOVE_VOTE_REQUEST:
    case CHECK_VOTE_REQUEST:
      return { 
        ...state, 
        loading: action.type !== CHECK_VOTE_REQUEST,
        checkingVote: action.type === CHECK_VOTE_REQUEST,
        error: null 
      };
    
    case CAST_VOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        votedIssues: {
          ...state.votedIssues,
          [action.payload.issueId]: true
        }
      };
    
    case REMOVE_VOTE_SUCCESS:
      const newVotedIssues = { ...state.votedIssues };
      delete newVotedIssues[action.payload.issueId];
      return {
        ...state,
        loading: false,
        votedIssues: newVotedIssues
      };
    
    case CHECK_VOTE_SUCCESS:
      return {
        ...state,
        checkingVote: false,
        votedIssues: {
          ...state.votedIssues,
          [action.payload.issueId]: action.payload.hasVoted
        }
      };
    
    case CAST_VOTE_FAILURE:
    case REMOVE_VOTE_FAILURE:
    case CHECK_VOTE_FAILURE:
      return { 
        ...state, 
        loading: false,
        checkingVote: false,
        error: action.payload 
      };
    
    default:
      return state;
  }
};

export default voteReducer;


// import {
//   CAST_VOTE_REQUEST,
//   CAST_VOTE_SUCCESS,
//   CAST_VOTE_FAILURE
// } from '../constants/actionTypes';

// const initialState = {
//   loading: false,
//   error: null,
//   votedIssues: []
// };

//  const voteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAST_VOTE_REQUEST:
//       return { ...state, loading: true, error: null };
    
//     case CAST_VOTE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         votedIssues: [...state.votedIssues, action.payload.issueId]
//       };
    
//     case CAST_VOTE_FAILURE:
//       return { ...state, loading: false, error: action.payload };
    
//     default:
//       return state;
//   }
// };

// export default voteReducer;