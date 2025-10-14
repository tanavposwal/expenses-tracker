import axios from 'axios';
import { API_ENDPOINTS, getAuthHeaders, getLoginHeaders } from '../config/api.js';

// User API functions
export const userAPI = {
  signup: async (userData) => {
    const response = await axios.post(API_ENDPOINTS.USER.SIGNUP, userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(
      API_ENDPOINTS.USER.LOGIN, 
      {}, 
      { headers: getLoginHeaders(email, password) }
    );
    return response.data;
  },

  verifyToken: async (token) => {
    const response = await axios.get(API_ENDPOINTS.USER.VERIFY(token));
    return response.data;
  }
};

// Transaction API functions
export const transactionAPI = {
  getTransactions: async () => {
    const response = await axios.get(
      API_ENDPOINTS.TRANSACTIONS.GET, 
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  addTransaction: async (transactionData) => {
    const response = await axios.post(
      API_ENDPOINTS.TRANSACTIONS.ADD, 
      transactionData, 
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  deleteTransaction: async (id) => {
    const response = await axios.delete(
      API_ENDPOINTS.TRANSACTIONS.DELETE(id), 
      { headers: getAuthHeaders() }
    );
    return response.data;
  }
};
