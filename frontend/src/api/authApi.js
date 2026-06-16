import axios from "axios";

import { API_BASE_URL } from "./config";
import httpClient from "./httpClient";

const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const login = (credentials) => authClient.post("/token/", credentials);

export const logout = (refresh) => httpClient.post("/logout/", { refresh });
