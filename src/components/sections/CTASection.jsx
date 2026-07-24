import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const ctaImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop";

function CTASection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ctaImage})` }}
      ></motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/40 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] text-sm mb-5"
        >
          Let's Build Something Exceptional
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          Ready To Start Your
          <br />
          Next Fit-Out Project?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-300 mt-8 text-base sm:text-lg max-w-2xl mx-auto leading-8"
        >
          Whether you're planning a new fit-out, a renovation, or ongoing
          building maintenance, our team is ready to discuss your
          requirements and provide a detailed proposal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            to="/quotation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C8A96A] text-black px-8 py-4 rounded-xl font-semibold hover:-translate-y-1 hover:bg-yellow-500 transition-all duration-300"
          >
            <span>Get Free Consultation</span>
            <FaArrowRight />
          </Link>

          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-[#C8A96A]/70 px-8 py-4 rounded-xl text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black transition-all duration-300"
          >
            <span>View Projects</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-5"
        >
          <a
            href="tel:+97142679470"
            className="flex items-center gap-3 text-white hover:text-[#C8A96A] transition-colors"
          >
            <FaPhoneAlt className="text-[#C8A96A]" />
            <span>+971 4 267 9470</span>
          </a>

          <span className="hidden sm:block w-px h-6 bg-white/15"></span>

          <a
            href="https://wa.me/971552530169"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-white hover:text-[#C8A96A] transition-colors"
          >
            <FaWhatsapp className="text-[#C8A96A]" />
            <span>+971 55 253 0169</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;