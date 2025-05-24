import API from './axios';

export const register = (userData) => API.post('/api/auth/register', userData);
export const login = (userData) => API.post('/api/auth/login', userData);
// export const getMe = () => API.get('/api/auth/me');
export const logout = () => {
  localStorage.removeItem('token');
};