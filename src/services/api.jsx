import axios from 'axios';

const API_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com';

export const register = (username, password, role) => {
  return axios.post(`${API_URL}/auth/register`, { username, password, role });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};