import { useState, useCallback } from "react";
import {
  adminLogin,
  adminLogout,
  getCurrentAdmin,
  isAdminAuthenticated,
} from "../services/authService";

export function useAdminAuth() {
  const [user, setUser] = useState(getCurrentAdmin());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const loggedInUser = await adminLogin(email, password);
      setUser(loggedInUser);
      return true;
    } catch (err) {
      const message =
        err.response?.data?.errors?.non_field_errors?.[0] ||
        err.response?.data?.errors?.message ||
        "Invalid email or password.";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    adminLogout();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: isAdminAuthenticated(),
  };
}