import {
  FaChartPie,
  FaProjectDiagram,
  FaTools,
  FaCubes,
  FaImages,
  FaBlog,
  FaBriefcase,
  FaFileInvoiceDollar,
  FaEnvelopeOpenText,
  FaUsers,
  FaStar,
  FaCog,
} from "react-icons/fa";

export const adminNavSections = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", to: "/admin", icon: FaChartPie, exact: true }],
  },
  {
    label: "Content",
    items: [
      { label: "Projects", to: "/admin/projects", icon: FaProjectDiagram },
      { label: "Services", to: "/admin/services", icon: FaTools },
      { label: "Materials", to: "/admin/materials", icon: FaCubes },
      { label: "Testimonials", to: "/admin/testimonials", icon: FaStar },
    ],
  },
  {
    label: "Leads",
    items: [
      { label: "Quotations", to: "/admin/quotations", icon: FaFileInvoiceDollar },
      { label: "Contact Messages", to: "/admin/messages", icon: FaEnvelopeOpenText },
      { label: "Careers", to: "/admin/careers", icon: FaBriefcase },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Users", to: "/admin/users", icon: FaUsers },
      { label: "Settings", to: "/admin/settings", icon: FaCog },
    ],
  },
];