import axios from "axios";

import { getAccessToken } from "../utils/tokenStorage";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const httpClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default httpClient;
