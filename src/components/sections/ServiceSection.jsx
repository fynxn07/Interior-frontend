import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useServices } from "../../hooks/useServices";
import { getIcon } from "../../utils/iconMap";

function ServicesSection() {
  const { services, loading } = useServices();

  if (loading) {
    return null;
  }

  const featuredServices = services.slice(0, 4);

  if (featuredServices.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#111111] py-20 md:py-28">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm">
            Our Services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Interior Design · Fit-Out · Joinery
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg">
            From concept to completion, our in-house teams deliver every
            stage of the project under one roof.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => {
            const Icon = getIcon(service.icon);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex flex-col h-full rounded-2xl p-7 sm:p-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-[#C8A96A]/60 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[#C8A96A] text-black flex items-center justify-center text-xl">
                    <Icon />
                  </div>

                  <h3 className="text-white text-lg sm:text-xl font-semibold mt-6">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 mt-3 text-sm leading-6 flex-1">
                    {service.shortDescription}
                  </p>

                  <span className="inline-flex items-center gap-2 mt-6 text-[#C8A96A] text-sm font-semibold group-hover:gap-4 transition-all">
                    Learn More <FaArrowRight />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 rounded-lg border border-[#C8A96A] px-8 py-3.5 font-semibold text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black transition-all duration-300"
          >
            View All Services
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;