import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const heroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop";

const stats = [
  { value: "45+", label: "Years in Business" },
  { value: "350+", label: "Projects Delivered" },
  { value: "7", label: "U.A.E. Emirates Served" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-[#111111]">
      <motion.img
        src={heroImage}
        alt="OK Decoration — Luxury Interior Fit-Out"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl items-center px-6 lg:px-10 pt-24 lg:pt-0">
        <div className="max-w-2xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mb-4 lg:mb-5 uppercase tracking-[6px] text-[#C8A96A] text-sm"
          >
            Interior Design · Fit-Out · Building Maintenance
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.25}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white"
          >
            Four Decades of
            <br />
            <span className="text-[#C8A96A]">Legacy &amp; Precision.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="mt-5 lg:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300"
          >
            Since 1978, OK Decoration has transformed complex visions into
            reality across the U.A.E. — turnkey interiors for residential
            estates, corporate hubs, and world-class hospitality venues.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.55}
            className="mt-8 lg:mt-10 flex flex-wrap gap-3 lg:gap-4"
          >
            <Link
              to="/projects"
              className="rounded-lg bg-[#C8A96A] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-500"
            >
              Explore Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-[#C8A96A] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#C8A96A] transition-all duration-300 hover:bg-[#C8A96A] hover:text-black"
            >
              Get Free Consultation
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.75}
            className="mt-10 lg:mt-16 flex gap-6 sm:gap-10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#C8A96A]">{s.value}</h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="hidden lg:flex absolute bottom-40 right-10 xl:right-16 flex-col gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md max-w-[220px]"
      >
        <span className="text-xs uppercase tracking-widest text-[#C8A96A]">Trusted by</span>
        <span className="text-white text-sm font-medium">Emaar · Sobha · Cartier · DMCC</span>
      </motion.div>
    </section>
  );
}

export default Hero;