import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import Portal from "../ui/Portal";
import { navigationLinks } from "../../utils/navigation";

function MobileMenu({ openMenu, setOpenMenu }) {
  return (
    <Portal open={openMenu}>
      <AnimatePresence>
        {openMenu && (
          <>
            {/* Backdrop — sits at the very top of the true document stacking order now */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
              className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-[201] h-full w-[80%] max-w-sm flex flex-col bg-[#111111] border-l border-white/10 lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 flex-shrink-0">
                <img src="/logo-iconz.png" alt="OK Decoration" className="h-9 w-auto" />
                <button
                  onClick={() => setOpenMenu(false)}
                  aria-label="Close menu"
                  className="text-white text-2xl"
                >
                  <HiX />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-6 py-8 overflow-y-auto">
                {navigationLinks.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    end={item.path === "/"}
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

              <div className="mt-auto px-6 pb-10 flex-shrink-0">
                <Link
                  to="/quotation"
                  onClick={() => setOpenMenu(false)}
                  className="block text-center bg-[#C8A96A] text-black py-3 rounded-lg font-semibold"
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default MobileMenu;