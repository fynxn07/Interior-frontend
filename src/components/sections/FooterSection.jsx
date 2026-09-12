import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { servicesData } from "../../data/ServicesData";

function FooterSection() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [

    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Materials", to: "/materials" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="relative bg-[#0B0B0B] text-white border-t border-white/10">
      {/* Top */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold">
              OK<span className="text-[#C8A96A]">Decoration</span>
            </h2>

            <p className="text-[#C8A96A]/80 text-xs uppercase tracking-widest mt-1">
              Since 1978
            </p>

            <p className="text-gray-400 mt-6 leading-7 text-sm sm:text-base max-w-xs">
              Interior Design · Fit-Out · Building Maintenance. Four
              decades of legacy and precision across Dubai, Sharjah, and
              Abu Dhabi.
            </p>

            <div className="flex gap-3 mt-8">
              
              <a
                href="https://instagram.com/okdecoration"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex justify-center items-center hover:bg-[#C8A96A] hover:text-black hover:border-[#C8A96A] transition-all duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/971552530169"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex justify-center items-center hover:bg-[#C8A96A] hover:text-black hover:border-[#C8A96A] transition-all duration-300"
              >
                <FaWhatsapp />
              </a>

              <a
                href="mailto:info@okdecoration.ae"
                aria-label="Email"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex justify-center items-center hover:bg-[#C8A96A] hover:text-black hover:border-[#C8A96A] transition-all duration-300"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 text-sm hover:text-[#C8A96A] transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <div className="flex flex-col gap-3.5">
              {servicesData.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="text-gray-400 text-sm hover:text-[#C8A96A] transition-colors w-fit"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-5 text-sm">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-[#C8A96A] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Al Qusais Industrial Area 4, Dubai 6776
                </span>
              </div>

              <a
                href="tel:+97142679470"
                className="flex gap-3 text-gray-400 hover:text-[#C8A96A] transition-colors"
              >
                <FaPhoneAlt className="text-[#C8A96A] mt-0.5 flex-shrink-0" />
                <span>+971 4 267 9470</span>
              </a>

              <a
                href="https://wa.me/971552530169"
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 text-gray-400 hover:text-[#C8A96A] transition-colors"
              >
                <FaWhatsapp className="text-[#C8A96A] mt-0.5 flex-shrink-0" />
                <span>+971 55 253 0169</span>
              </a>

              <a
                href="mailto:info@okdecoration.ae"
                className="flex gap-3 text-gray-400 hover:text-[#C8A96A] transition-colors break-all"
              >
                <FaEnvelope className="text-[#C8A96A] mt-0.5 flex-shrink-0" />
                <span>info@okdecoration.ae</span>
              </a>

              <div className="flex gap-3">
                <FaClock className="text-[#C8A96A] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Monday – Saturday, 8:00 AM – 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-7 flex flex-col sm:flex-row justify-between items-center gap-5">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} O.K. Decoration & Building
            Maintenance LLC. All rights reserved.
          </p>

          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="w-11 h-11 rounded-full bg-[#C8A96A] text-black flex items-center justify-center hover:scale-110 hover:bg-yellow-500 transition-all duration-300 shadow-lg shadow-[#C8A96A]/20"
          >
            <FaArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;