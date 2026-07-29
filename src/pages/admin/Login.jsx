import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { useAdminAuth } from "../../hooks/useAdminAuth";

function AdminLogin() {
  const navigate = useNavigate();
  const { login, loading, error } = useAdminAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  const success = await login(
    form.email.trim(),
    form.password
  );

  if (success) navigate("/admin");
};

  return (
    <div className="relative min-h-screen bg-[#0B0B0B] flex items-center justify-center overflow-hidden px-6">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C8A96A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#C8A96A]/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            OK<span className="text-[#C8A96A]">Decoration</span>
          </h1>
          <p className="text-[#C8A96A]/70 text-xs uppercase tracking-widest mt-1">
            Admin Panel
          </p>
        </div>

        {/* Glass card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-black/40">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to manage your website content.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  placeholder="admin@okdecoration.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A96A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-11 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A96A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C8A96A] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/25 rounded-lg px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#C8A96A] text-black px-8 py-3.5 rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-yellow-500 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Signing in..." : (
                <>
                  Sign In <FaArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          © {new Date().getFullYear()} O.K. Decoration & Building Maintenance LLC
        </p>
      </motion.div>
    </div>
  );
}

export default AdminLogin;