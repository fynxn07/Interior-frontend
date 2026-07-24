import { motion } from "framer-motion";

function EmptyState({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-24 px-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8B7CFF] text-2xl mb-6">
        <Icon />
      </div>
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 text-sm mt-2 max-w-sm">{description}</p>
    </motion.div>
  );
}

export default EmptyState;