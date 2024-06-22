import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

const API_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com';

export const register = (username, password, role) => {
  return axios.post(`${API_URL}/auth/register`, { username, password, role });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const createItem = (item) => {
    return axios.post(`${API_URL}/items`, item, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  };
  
  export const editItem = (item) => {
    return axios.put(`${API_URL}/items`, item, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  };
  
  export const deleteItem = (itemId) => {
    return axios.delete(`${API_URL}/item/${itemId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  };
  
  export const fetchItemById = (id) => {
    return axios.get(`${API_URL}/item/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  };
  
  export const fetchItems = (limit = 10, lastKey = null) => {
    return axios.get(`${API_URL}/items`, { params: { limit, lastKey } });
  };
  
  export const buyCart = (userId) => {
    return axios.post(`${API_URL}/buy`, { userId }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  };

  export const getRoleBasedOnToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    } catch (error) {
      throw new Error('Invalid token format');
    }
  };