import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const accessToken = localStorage.getItem("okdecoration_admin_access");
  const adminUser = localStorage.getItem("okdecoration_admin_user");

  if (!accessToken || !adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;