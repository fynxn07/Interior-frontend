import axiosInstance from "./axiosInstance";

// Update this path to match your urls.py — e.g. path("admin/login/", AdminLoginView.as_view())
const ADMIN_LOGIN_ENDPOINT = "/auth/admin/login/";

export async function adminLogin(email, password) {
  const response = await axiosInstance.post(ADMIN_LOGIN_ENDPOINT, {
    email,
    password,
  });

  // Matches your view's response shape: { success, message, data: { access, refresh, user } }
  const { data } = response.data;

  localStorage.setItem("okdecoration_admin_access", data.access);
  localStorage.setItem("okdecoration_admin_refresh", data.refresh);
  localStorage.setItem("okdecoration_admin_user", JSON.stringify(data.user));

  return data.user;
}

export function adminLogout() {
  localStorage.removeItem("okdecoration_admin_access");
  localStorage.removeItem("okdecoration_admin_refresh");
  localStorage.removeItem("okdecoration_admin_user");
}

export function getCurrentAdmin() {
  const raw = localStorage.getItem("okdecoration_admin_user");
  return raw ? JSON.parse(raw) : null;
}

export function isAdminAuthenticated() {
  return !!localStorage.getItem("okdecoration_admin_access");
}