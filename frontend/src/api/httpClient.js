import axios from "axios";

import { API_BASE_URL } from "./config";
import { getAccessToken } from "../utils/tokenStorage";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
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
