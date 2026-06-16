import httpClient from "./httpClient";

export const login = (credentials) => httpClient.post("/token/", credentials);

export const logout = (refresh) => httpClient.post("/logout/", { refresh });
