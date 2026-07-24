import { motion } from "framer-motion";

function StatCard({ icon: Icon, label, value, trend, accent = "#8B7CFF", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 relative overflow-hidden group"
    >
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
          {trend && (
            <p className="text-xs mt-2" style={{ color: accent }}>
              {trend}
            </p>
          )}
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          <Icon />
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;