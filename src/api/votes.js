import API from './axios';

export const castVote = (issueId) => API.post(`/api/votes/${issueId}`);
export const checkVote = (issueId) => API.get(`/api/votes/check/${issueId}`);