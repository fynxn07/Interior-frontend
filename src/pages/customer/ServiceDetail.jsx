import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useServices } from "../../hooks/useServices";
import { getIcon } from "../../utils/iconMap";

function ServiceDetail() {
  const { slug } = useParams();
  const { services, getBySlug } = useServices();
  const service = getBySlug(slug);

  // Wait for services to load before deciding it's a 404
  if (services.length && !service) return <Navigate to="/services" replace />;
  if (!service) return null;

  const Icon = getIcon(service.icon);
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Hero — crisp image, gradient for legibility, no blur on the photo */}
      <section className="relative h-[65vh] min-h-[460px] overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-screen-2xl mx-auto px-6 lg:px-10 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-[#C8A96A] text-sm transition-colors mb-6"
            >
              ← Back to Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-5"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#C8A96A] text-black flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 shadow-lg shadow-black/40">
              <Icon />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {service.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Overview + Scope */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="uppercase tracking-[6px] text-[#C8A96A] mb-4 text-sm">
              Overview
            </p>
            <p className="text-gray-300 leading-8 text-base sm:text-lg">
              {service.description}
            </p>

            <Link
              to="/quotation"
              className="inline-flex items-center gap-3 mt-10 rounded-lg bg-[#C8A96A] px-8 py-3.5 font-semibold text-black hover:-translate-y-1 hover:bg-yellow-500 transition-all duration-300"
            >
              Request a Quotation <FaArrowRight />
            </Link>
          </motion.div>

          {/* Scope — genuine glass panel, floating over the plain dark bg, so blur actually makes sense here */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl h-fit"
          >
            <h3 className="text-white text-xl font-semibold mb-6">
              Scope of Work
            </h3>
            <ul className="space-y-4">
              {service.scope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-gray-300 text-sm sm:text-base"
                >
                  <FaCheckCircle className="text-[#C8A96A] mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Other services */}
      {otherServices.length > 0 && (
        <section className="border-t border-white/10 bg-[#0b0b0b] py-16 md:py-20">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              Other Services
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {otherServices.map((s) => {
                const OIcon = getIcon(s.icon);
                return (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="group rounded-2xl p-6 border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-[#C8A96A]/60 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C8A96A] text-black flex items-center justify-center text-lg mb-4">
                      <OIcon />
                    </div>
                    <h4 className="text-white font-semibold">{s.title}</h4>
                    <span className="inline-flex items-center gap-2 mt-3 text-[#C8A96A] text-sm font-semibold group-hover:gap-3 transition-all">
                      View <FaArrowRight size={12} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ServiceDetail;