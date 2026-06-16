import axios from "axios";

import httpClient from "./httpClient";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const authClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const login = (credentials) => authClient.post("/token/", credentials);

export const logout = (refresh) => httpClient.post("/logout/", { refresh });
