// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

// API Endpoints
export const API_ENDPOINTS = {
  USER: {
    SIGNUP: `${API_BASE_URL}user/signup`,
    LOGIN: `${API_BASE_URL}user/login`,
    VERIFY: (token) => `${API_BASE_URL}user/verify/${token}`,
  },
  TRANSACTIONS: {
    GET: `${API_BASE_URL}user/entry`,
    ADD: `${API_BASE_URL}user/entry`,
    DELETE: (id) => `${API_BASE_URL}user/entry/${id}`,
  }
};

// HTTP Headers
export const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
});

export const getLoginHeaders = (email, password) => ({
  email,
  password,
});
