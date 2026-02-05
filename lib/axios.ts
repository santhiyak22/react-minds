import axios from "axios";
import { getAuthToken } from "./auth";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true, // 🔥 VERY IMPORTANT
  headers: {
    Accept: "application/json",
  },
});
console.log("ENV URL =", process.env.NEXT_PUBLIC_API_URL);

// ✅ REQUEST INTERCEPTOR - ADD JWT TOKEN TO ALL REQUESTS
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ JWT token attached to request:", config.url);
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// ✅ RESPONSE INTERCEPTOR - HANDLE 401 ERRORS
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🔴 Unauthorized (401) - Token may be expired");
      // Token is invalid, clear it
      if (typeof window !== "undefined") {
        // Clear token from auth.ts
        const { setAuthToken } = require("./auth");
        setAuthToken(null);
        // Redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
