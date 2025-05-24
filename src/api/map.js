import API from './axios';

export const getMapIssues = () => API.get('/api/map');