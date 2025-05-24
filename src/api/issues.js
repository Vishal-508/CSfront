import API from './axios';

export const createIssue = (issueData) => {
  const formData = new FormData();
  Object.keys(issueData).forEach((key) => {
    formData.append(key, issueData[key]);
  });
  return API.post('/api/issues', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getIssues = (params = {}) =>
  API.get('/api/issues', { params });

export const getUserIssues = () => API.get('/api/issues/user');

export const getIssueById = (id) => API.get(`/api/issues/${id}`);

export const updateIssue = (id, issueData) =>
  API.put(`/api/issues/${id}`, issueData);

export const deleteIssue = (id) => API.delete(`/api/issues/${id}`);