import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { navigationLinks } from "../../utils/navigation";

function MobileMenu({ openMenu, setOpenMenu }) {
  return (
    <AnimatePresence>
      {openMenu && (
        <>
          {/* Dim backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenMenu(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#111111] border-l border-white/10 z-50 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
              <span className="text-xl font-bold text-white">
                OK<span className="text-[#C8A96A]">Decoration</span>
              </span>
              <button onClick={() => setOpenMenu(false)} className="text-white text-2xl">
                <HiX />
              </button>
            </div>

            <nav className="flex flex-col gap-2 px-6 py-8">
              {navigationLinks.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setOpenMenu(false)}
                  className={({ isActive }) =>
                    `py-3 text-lg border-b border-white/5 transition-colors ${
                      isActive ? "text-[#C8A96A]" : "text-white/80 hover:text-[#C8A96A]"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-10 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setOpenMenu(false)}
                className="text-center text-white/80 py-3 border border-white/15 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/quotation"
                onClick={() => setOpenMenu(false)}
                className="text-center bg-[#C8A96A] text-black py-3 rounded-lg font-semibold"
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;