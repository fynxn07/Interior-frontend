import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaProjectDiagram, FaTools, FaCubes, FaFileInvoiceDollar,
  FaEnvelopeOpenText, FaBriefcase, FaPlus, FaArrowRight,
  FaExclamationCircle, FaCheckCircle,
} from "react-icons/fa";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import StatCard from "../../components/admin/StatCard";

const STATUS_COLORS = {
  pending: "#FBBF24",
  approved: "#34D399",
  "in-progress": "#22D3EE",
  completed: "#8B7CFF",
  rejected: "#F87171",
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay } }),
};

const quickActions = [
  { label: "Add Project", to: "/admin/projects", icon: FaProjectDiagram, accent: "#8B7CFF" },
  { label: "Add Service", to: "/admin/services", icon: FaTools, accent: "#22D3EE" },
  { label: "Add Material", to: "/admin/materials", icon: FaCubes, accent: "#34D399" },
  { label: "Post a Job", to: "/admin/careers", icon: FaBriefcase, accent: "#FB923C" },
];

function Dashboard() {
  const { user } = useAdminAuth();
  const { stats, loading } = useDashboardStats();

  if (loading || !stats) {
    return (
      <div className="p-6 lg:p-10">
        <p className="text-gray-500 text-sm">Loading dashboard...</p>
      </div>
    );
  }

  const { counts, quotation_status_breakdown, projects_by_category, content_overview, activity } = stats;
  const needsAttention = counts.quotations_pending + counts.messages_unread;
  const totalQuotations = counts.quotations_total || 1;
  const totalProjects = counts.projects || 1;

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <p className="text-gray-500 text-sm">
            {greeting()}, <span className="text-gray-300">{user?.email || "Admin"}</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Dashboard</h1>
        </div>

        {needsAttention > 0 && (
          <Link
            to="/admin/quotations"
            className="inline-flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-amber-400 text-sm hover:bg-amber-500/15 transition-colors"
          >
            <FaExclamationCircle size={14} />
            {needsAttention} item{needsAttention > 1 ? "s" : ""} need attention
          </Link>
        )}
      </motion.div>

      {/* Stat cards — real totals, unaffected by pagination */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
        <StatCard icon={FaProjectDiagram} label="Projects" value={counts.projects} accent="#8B7CFF" delay={0} />
        <StatCard icon={FaTools} label="Services" value={counts.services} accent="#22D3EE" delay={0.05} />
        <StatCard icon={FaCubes} label="Materials" value={counts.materials} accent="#34D399" delay={0.1} />
        <StatCard
          icon={FaFileInvoiceDollar}
          label="Pending Quotations"
          value={counts.quotations_pending}
          trend={`${counts.quotations_total} total`}
          accent="#FBBF24"
          delay={0.15}
        />
        <StatCard
          icon={FaEnvelopeOpenText}
          label="Unread Messages"
          value={counts.messages_unread}
          trend={`${counts.messages_total} total`}
          accent="#F472B6"
          delay={0.2}
        />
        <StatCard
          icon={FaBriefcase}
          label="Applications"
          value={counts.applications_total}
          trend={`${counts.jobs_open} open roles`}
          accent="#FB923C"
          delay={0.25}
        />
      </div>

      {/* Quick actions */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.3} className="mb-8">
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.to}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 hover:border-white/25 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                  style={{ backgroundColor: `${action.accent}22`, color: action.accent }}
                >
                  <Icon size={15} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                    <FaPlus size={7} />
                  </span>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.35}
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7"
        >
          <h3 className="text-white font-semibold text-lg mb-6">Recent Activity</h3>
          {activity.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">
              No activity yet — new quotations, messages, and applications will appear here.
            </p>
          ) : (
            <div className="space-y-1">
              {activity.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className="flex items-start gap-4 -mx-2 px-2 py-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200"
                >
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm truncate">{item.text}</p>
                  </div>
                  <span className="text-gray-600 text-xs whitespace-nowrap">{timeAgo(item.date)}</span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quotation status breakdown */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7"
        >
          <h3 className="text-white font-semibold text-lg mb-6">Quotation Status</h3>
          {quotation_status_breakdown.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">No quotations submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {quotation_status_breakdown.map((s, i) => {
                const pct = Math.round((s.count / totalQuotations) * 100);
                return (
                  <div key={s.status}>
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5 capitalize">
                      <span>{s.status.replace("-", " ")}</span>
                      <span>{s.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: 0.5 + i * 0.08 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: STATUS_COLORS[s.status] || "#8B7CFF" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Link
            to="/admin/quotations"
            className="inline-flex items-center gap-2 mt-6 text-[#8B7CFF] text-sm font-medium hover:gap-3 transition-all"
          >
            View all quotations <FaArrowRight size={11} />
          </Link>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7"
        >
          <h3 className="text-white font-semibold text-lg mb-6">Projects by Category</h3>
          {projects_by_category.length === 0 ? (
            <p className="text-gray-500 text-sm py-4 text-center">No projects yet.</p>
          ) : (
            <div className="space-y-4">
              {projects_by_category.map((row, i) => {
                const pct = Math.round((row.count / totalProjects) * 100) || 0;
                return (
                  <div key={row.category}>
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                      <span>{row.category}</span>
                      <span>{row.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: 0.5 + i * 0.08 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7"
        >
          <h3 className="text-white font-semibold text-lg mb-6">Content Overview</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Open Job Roles", value: content_overview.open_job_roles, icon: FaBriefcase, accent: "#FB923C", to: "/admin/careers" },
              { label: "Featured Projects", value: content_overview.featured_projects, icon: FaCheckCircle, accent: "#34D399", to: "/admin/projects" },
              { label: "Material Categories", value: content_overview.material_categories, icon: FaCubes, accent: "#22D3EE", to: "/admin/materials" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${item.accent}22`, color: item.accent }}
                  >
                    <Icon size={13} />
                  </div>
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.label}</p>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;