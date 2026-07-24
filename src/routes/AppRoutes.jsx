import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
// import AdminProtectedRoute from "./AdminProtectedRoute";

// Customer Pages
import Home from "../pages/customer/Home";
import About from "../pages/customer/About";
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
// import AdminServices from "../pages/admin/Services";
// import AdminMaterials from "../pages/admin/Materials";

// Placeholder Component
import EmptyState from "../components/admin/EmptyState";

// Icons
import {
  FaProjectDiagram,
  FaImages,
  FaBlog,
  FaStar,
  FaFileInvoiceDollar,
  FaEnvelopeOpenText,
  FaBriefcase,
  FaUsers,
  FaCog,
} from "react-icons/fa";

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
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/quotation" element={<Quotation />} />
        </Route>

        {/* ================= Admin Login ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= Admin Routes (Temporary - No Protection) ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          {/* Working Modules */}
          {/* <Route path="services" element={<AdminServices />} /> */}
          {/* <Route path="materials" element={<AdminMaterials />} /> */}

          <Route
            path="projects"
            element={
              <AdminProjects
                icon={FaProjectDiagram}
                title="Projects Management"
                description="Add, edit, and delete projects — coming next."
              />
            }
          />

          <Route
            path="services"
            element={
              <AdminServices
                icon={FaImages}
                title="Gallery Management"
                description="Gallery is auto-derived from Projects — no separate admin needed here."
              />
            }
          />

          <Route
            path="materials"
            element={
              <AdminMaterials
                icon={FaBlog}
                title="Blog Management"
                description="Add, edit, and delete blog posts — coming next."
              />
            }
          />

          <Route
            path="testimonials"
            element={
              <EmptyState
                icon={FaStar}
                title="Testimonials Management"
                description="Manage client testimonials — coming next."
              />
            }
          />

          <Route
            path="quotations"
            element={
              <AdminQuotations
                icon={FaFileInvoiceDollar}
                title="Quotation Requests"
                description="View, assign, and update quotation status — coming next."
              />
            }
          />

          <Route
            path="messages"
            element={
              <AdminMessages
                icon={FaEnvelopeOpenText}
                title="Contact Messages"
                description="View, reply, and delete messages — coming next."
              />
            }
          />

          <Route
            path="careers"
            element={
              <AdminCareers
                icon={FaBriefcase}
                title="Careers Management"
                description="Manage job postings and applications — coming next."
              />
            }
          />

          <Route
            path="users"
            element={
              <EmptyState
                icon={FaUsers}
                title="Admin Accounts"
                description="Manage admin accounts — coming next."
              />
            }
          />

          <Route
            path="settings"
            element={
              <EmptyState
                icon={FaCog}
                title="Website Settings"
                description="Manage logo, company information, social links, SEO and homepage content — coming next."
              />
            }
          />
        </Route>

        {/*
        ================= Production Version =================

        Uncomment this when the backend login is ready.

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            ...
          </Route>
        </Route>

        */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;