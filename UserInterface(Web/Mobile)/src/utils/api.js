import axios from "axios";

// PUBLIC_INTERFACE
/**
 * Axios instance for API calls, reading base URL from env variable for flexibility.
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api",
  withCredentials: true
});

export default api;
