// In your api service file
import axios from "axios";

const API_BASE_URL = "https://sabit-portfolio.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
