import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

import { navigationLinks } from "../../utils/navigation";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#111111]/70 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/50 to-transparent py-6"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-xl font-bold tracking-wide text-white">
            OK<span className="text-[#C8A96A]">Decoration</span>
          </Link>

          {/* Desktop nav — all 6 links fit in one row now, no dropdown needed */}
          <nav className="hidden lg:flex items-center gap-7">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `text-[13px] uppercase tracking-wider whitespace-nowrap transition duration-300 ${
                    isActive ? "text-[#C8A96A]" : "text-white/85 hover:text-[#C8A96A]"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <Link
              to="/quotation"
              className="bg-[#C8A96A] text-black px-5 py-2 rounded-lg text-[13px] font-semibold hover:bg-yellow-500 transition"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpenMenu(true)}
            className="lg:hidden text-white text-2xl"
            aria-label="Open menu"
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      <MobileMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </header>
  );
}

export default Navbar;