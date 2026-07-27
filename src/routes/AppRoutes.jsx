import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminProtectedRoute from "./AdminProtectedRoute";

// Customer Pages
import Home from "../pages/customer/Home";
import Services from "../pages/customer/Services";
import ServiceDetail from "../pages/customer/ServiceDetail";
import Projects from "../pages/customer/Projects";
import ProjectDetail from "../pages/customer/ProjectsDetail";
import Materials from "../pages/customer/Materials";
import Careers from "../pages/customer/Careers";
import Quotation from "../pages/customer/Quotation";
import Contacts from "../pages/customer/Contacts";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import AdminLogin from "../pages/admin/Login";
import AdminProjects from "../pages/admin/Projects";
import AdminServices from "../pages/admin/Services";
import AdminMaterials from "../pages/admin/Materials";
import AdminCareers from "../pages/admin/Careers";
import AdminQuotations from "../pages/admin/Quotations";
import AdminMessages from "../pages/admin/Messages";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Customer Routes ================= */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/quotation" element={<Quotation />} />
        </Route>

        {/* ================= Admin Login ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= Protected Admin Routes ================= */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="materials" element={<AdminMaterials />} />
            <Route path="quotations" element={<AdminQuotations />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="careers" element={<AdminCareers />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;