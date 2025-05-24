import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import issueReducer from './reducers/issueReducer';
import voteReducer from './reducers/voteReducer';
import analyticsReducer from './reducers/analyticsReducer';
import mapReducer from './reducers/mapReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issueReducer,
    votes: voteReducer,
    analytics: analyticsReducer,
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';

// // reducers अब redux/reducers में हैं ⇒ '..' लगाना पड़ेगा
// import authReducer from './reducers/authReducer';
// import issueReducer from './reducers/issueReducer';
// import voteReducer from './reducers/voteReducer';
// import analyticsReducer from './reducers/analyticsReducer';
// import mapReducer from './reducers/mapReducer';


// // RTK में combineReducers अलग से नहीं चाहिए
// export const store = configureStore({
//   reducer: {
//     auth:       authReducer,
//     issues:     issueReducer,
//     votes:      voteReducer,
//     analytics:  analyticsReducer,
//     map:        mapReducer,
//   },
//   // thunk पहले-से include है; अलग से middleware नहीं देना पड़ेगा
// //   devTools: import.meta.env.MODE !== 'production',
// });



// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import authReducer from './reducers/authReducer';
// import issueReducer from './reducers/issueReducer';
// import voteReducer from './reducers/voteReducer';
// import analyticsReducer from './reducers/analyticsReducer';
// import mapReducer from './reducers/mapReducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   issues: issueReducer,
//   votes: voteReducer,
//   analytics: analyticsReducer,
//   map: mapReducer
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
//   devTools: process.env.NODE_ENV !== 'production'
// });