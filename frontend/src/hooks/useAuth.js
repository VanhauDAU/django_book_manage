import { useCallback, useState } from "react";

import { login as loginRequest, logout as logoutRequest } from "../api/authApi";
import {
  clearTokens,
  getRefreshToken,
  hasStoredSession,
  saveTokens,
} from "../utils/tokenStorage";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasStoredSession);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const login = useCallback(async (credentials) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const response = await loginRequest(credentials);
      saveTokens(response.data);
      setIsAuthenticated(true);
    } catch {
      clearTokens();
      setAuthError("Invalid username or password.");
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    const refresh = getRefreshToken();

    try {
      if (refresh) {
        await logoutRequest(refresh);
      }
    } finally {
      clearTokens();
      setIsAuthenticated(false);
    }
  }, []);

  return {
    authError,
    authLoading,
    isAuthenticated,
    login,
    logout,
    setAuthError,
  };
}
