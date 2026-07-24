import { motion } from "framer-motion";
import { FaCalendarAlt, FaBuilding, FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import Counter from "../ui/Counter";

// Straight from the "Why Choose Us" slide (08) — your real numbers
const stats = [
  { id: 1, icon: <FaCalendarAlt />, number: 45, suffix: "+", title: "Years in Business" },
  { id: 2, icon: <FaBuilding />, number: 350, suffix: "+", title: "Projects Delivered" },
  { id: 3, icon: <FaMapMarkedAlt />, number: 7, suffix: "", title: "U.A.E. Emirates Served" },
  { id: 4, icon: <FaUsers />, number: 25, suffix: "+", title: "In-House Design & Manufacturing Team" },
];

function StatsSection() {
  return (
    <section className="bg-[#0b0b0b] py-20 md:py-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm">
            Four Decades of Trust
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Numbers That Speak For Us
          </h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg">
            Since 1978, every project has reflected our commitment to
            precision, punctuality, and complete client satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-2xl sm:rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 sm:p-10 text-center hover:border-[#C8A96A]/60 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#C8A96A] text-black flex items-center justify-center text-xl sm:text-3xl mx-auto">
                {item.icon}
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold text-[#C8A96A] mt-6 sm:mt-8">
                <Counter to={item.number} suffix={item.suffix} />
              </h2>

              <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base leading-tight">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;