import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { adminNavSections } from "../../utils/adminNavigation";

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-7 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">
          OK<span className="text-[#8B7CFF]">Decoration</span>
        </h1>
        <p className="text-[#8B7CFF]/70 text-[11px] uppercase tracking-widest mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        {adminNavSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                        isActive
                          ? "text-white bg-white/[0.06]"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="admin-nav-active"
                            className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-gradient-to-b from-[#8B7CFF] to-[#6C5CE7]"
                          />
                        )}
                        <Icon
                          className={isActive ? "text-[#8B7CFF]" : "text-gray-500 group-hover:text-gray-300"}
                          size={14}
                        />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <p className="text-gray-600 text-[11px]">
          © {new Date().getFullYear()} O.K. Decoration LLC
        </p>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop — fixed, always visible */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-72 border-r border-white/10 bg-[#0D1220]/80 backdrop-blur-xl z-30">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {/* Mobile — slide-in drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{duration: 0.25, ease:"easeOut" }}
              className="fixed top-0 left-0 h-screen w-72 bg-[#0D1220] border-r border-white/10 z-50 lg:hidden will-change-transform"
            >
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="absolute top-6 right-5 text-gray-400 hover:text-white"
              >
                <FaTimes size={18} />
              </button>
              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;