import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaChevronDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAdminAuth } from "../../hooks/useAdminAuth";

function Topbar({ onMenuClick }) {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-white/10 bg-[#0B0F19]/70 backdrop-blur-xl flex items-center justify-between px-5 sm:px-8">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-300 hover:text-white"
        aria-label="Open menu"
      >
        <FaBars size={18} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4 sm:gap-5">
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#8B7CFF]/50 transition-colors duration-300"
        >
          <FaBell size={13} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#8B7CFF] border-2 border-[#0B0F19]" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#8B7CFF]/50 transition-colors duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B7CFF] to-[#6C5CE7] flex items-center justify-center text-white text-xs font-semibold">
              {user?.username?.[0]?.toUpperCase() || <FaUserCircle size={14} />}
            </div>
            <span className="hidden sm:block text-sm text-gray-200 max-w-[120px] truncate">
              {user?.username || "Admin"}
            </span>
            <FaChevronDown size={10} className="text-gray-500 mr-1" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-48 rounded-xl border border-white/10 bg-[#131826] shadow-2xl shadow-black/40 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-white text-sm font-medium truncate">
                  {user?.username}
                </p>
                <p className="text-gray-500 text-xs truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <FaSignOutAlt size={13} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;