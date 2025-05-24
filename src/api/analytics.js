import API from './axios';

export const getCategoryAnalytics = () => API.get('/api/analytics/categories');
export const getSubmissionAnalytics = () => API.get('/api/analytics/submissions');
export const getMostVotedAnalytics = () => API.get('/api/analytics/most-voted');