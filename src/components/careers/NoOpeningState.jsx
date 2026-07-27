import { motion } from "framer-motion";
import { FaBriefcase, FaEnvelope, FaBell } from "react-icons/fa";

function NoOpeningsState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl py-20 px-6 sm:px-12 text-center"
    >
      {/* Ambient glow, same visual language as the rest of your admin/customer glass panels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#C8A96A]/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-[#C8A96A]/10 border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] text-2xl"
      >
        <FaBriefcase />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="relative z-10 text-2xl sm:text-3xl font-bold text-white mt-7"
      >
        No Open Positions Right Now
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="relative z-10 text-gray-400 text-sm sm:text-base leading-7 max-w-xl mx-auto mt-4"
      >
        We're not actively hiring at the moment, but our team is always
        growing. Send us your details and we'll reach out the moment a role
        that fits opens up.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-9"
      >
        <a
          href="mailto:okdecor6776@gmail.com?subject=Future Opportunity - General Application"
          className="inline-flex items-center gap-3 bg-[#C8A96A] text-black px-7 py-3.5 rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-yellow-500 transition-all duration-300"
        >
          <FaEnvelope size={14} /> Send Your Resume
        </a>
        <span className="inline-flex items-center gap-2.5 text-gray-500 text-sm">
          <FaBell size={12} className="text-[#C8A96A]" />
          Check back soon — new roles are posted regularly
        </span>
      </motion.div>
    </motion.div>
  );
}

export default NoOpeningsState;