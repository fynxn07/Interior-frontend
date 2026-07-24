import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useMaterials } from "../../hooks/useMaterials";

function resolveLogo(logo) {
  return typeof logo === "string" ? logo : logo;
}

function Materials() {
  const { materials, groups } = useMaterials();
  const [activeGroup, setActiveGroup] = useState("All");

  const filtered = useMemo(
    () =>
      activeGroup === "All"
        ? materials
        : materials.filter((m) => m.group === activeGroup),
    [materials, activeGroup]
  );

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Header */}
      <section className="relative pt-40 pb-16 px-6 lg:px-10 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A96A]/[0.06] to-transparent pointer-events-none" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm"
        >
          Sourced With Care
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          Material Directory
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg"
        >
          Porcelain, ceramic, sanitaryware, paints, wood, laminates, lighting,
          and glass — sourced from trusted global manufacturers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`px-5 py-2 rounded-full text-sm uppercase tracking-wider border transition-all duration-300 ${
                activeGroup === g
                  ? "bg-[#C8A96A] text-black border-[#C8A96A]"
                  : "text-white/80 border-white/20 hover:border-[#C8A96A] hover:text-[#C8A96A]"
              }`}
            >
              {g}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((material, index) => (
            <motion.div
              key={material.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#C8A96A]/70 transition-colors duration-300 shadow-lg shadow-black/30 hover:shadow-[#C8A96A]/10"
            >
              {/* Logo window — clear, uncropped-feeling, warm card not flat white */}
              <div className="relative flex items-center justify-center h-32 sm:h-36 bg-gradient-to-br from-[#fdfcfa] to-[#efe8db] px-6 py-5">
                <img
                  src={resolveLogo(material.logo)}
                  alt={material.brand}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>

              {/* Details band */}
              <div className="bg-[#171717] px-5 py-4 border-t border-white/5 text-center">
                <p className="text-white text-sm sm:text-base font-semibold">
                  {material.brand}
                </p>
                <p className="text-[#C8A96A] text-xs uppercase tracking-wider mt-1.5">
                  {material.category}
                </p>
                <p className="text-gray-500 text-xs mt-1">{material.country}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No materials in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Materials;