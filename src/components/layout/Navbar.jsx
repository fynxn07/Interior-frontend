import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import logoGold from "../../assets/logos/logo-iconz.png";
import { navigationLinks } from "../../utils/navigation";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileNavbar, setShowMobileNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (window.innerWidth >= 1024) {
        setShowMobileNavbar(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (openMenu) {
        setShowMobileNavbar(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 60) {
        setShowMobileNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowMobileNavbar(false);
      } else {
        setShowMobileNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openMenu]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#111111]/70 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/70 via-black/40 to-transparent lg:from-black/50 lg:via-black/20 lg:to-transparent py-4 lg:py-6"
      } ${showMobileNavbar ? "translate-y-0" : "-translate-y-full"} lg:translate-y-0`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img
              src={logoGold}
              alt="OK Decoration"
              className={`w-auto transition-all duration-500 ${scrolled ? "h-8 lg:h-9" : "h-9 lg:h-11"}`}
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[9px] uppercase tracking-[3px] text-white/40 mt-1">
                Since 1978
              </span>
            </span>
          </Link>

          {/* Desktop nav — untouched */}
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

          {/* Right side — untouched */}
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