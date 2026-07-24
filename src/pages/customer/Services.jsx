import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useServices } from "../../hooks/useServices";
import { getIcon } from "../../utils/iconMap";

function Services() {
  const { services } = useServices();

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Page header */}
      <section className="relative pt-40 pb-20 px-6 lg:px-10 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A96A]/[0.06] to-transparent pointer-events-none" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm"
        >
          What We Do
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg"
        >
          Interior Design · Fit-Out · Building Maintenance — end-to-end
          turnkey solutions since 1978.
        </motion.p>
      </section>

      {/* Cards */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative flex flex-col h-[460px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#C8A96A]/60 transition-colors duration-500 shadow-xl shadow-black/30"
                >
                  {/* Image layer — stays crisp, no blur */}
                  <div className="absolute inset-0">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    {/* Strong gradient for legibility instead of blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Index number — top right, watermark style */}
                  <span className="absolute top-6 right-7 z-10 font-display text-6xl font-bold text-white/10 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon badge — glass makes sense here, it floats on open sky/image, not over text-critical area */}
                  <div className="relative z-10 mt-auto p-8 sm:p-9">
                    <div className="w-16 h-16 rounded-2xl bg-[#C8A96A] text-black flex items-center justify-center text-2xl shadow-lg shadow-black/40 mb-6 transition-transform duration-500 group-hover:-translate-y-1">
                      <Icon />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {service.title}
                    </h2>
                    <p className="text-gray-300 mt-3 text-sm sm:text-base leading-7 max-w-md">
                      {service.shortDescription}
                    </p>

                    <span className="inline-flex items-center gap-2 mt-7 text-[#C8A96A] font-semibold group-hover:gap-4 transition-all duration-300">
                      Explore Service <FaArrowRight />
                    </span>
                  </div>

                  {/* Gold edge glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-[#C8A96A]/0 group-hover:ring-[#C8A96A]/30 transition-all duration-500" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;