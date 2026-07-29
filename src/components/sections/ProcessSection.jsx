import { motion } from "framer-motion";
import {
  FaComments,
  FaPencilRuler,
  FaCubes,
  FaHammer,
  FaHouseUser,
} from "react-icons/fa";

const process = [
  {
    id: 1,
    icon: <FaComments />,
    title: "Consultation",
    description:
      "We begin with a site survey and in-depth consultation to understand your vision, space, and budget.",
  },
  {
    id: 2,
    icon: <FaPencilRuler />,
    title: "Concept & Design",
    description:
      "Our in-house design team develops concept layouts, material selection, and shop drawings.",
  },
  {
    id: 3,
    icon: <FaCubes />,
    title: "3D Visualization",
    description:
      "Every space is visualized in 3D before execution, so there are no surprises once work begins.",
  },
  {
    id: 4,
    icon: <FaHammer />,
    title: "Fit-Out & Joinery",
    description:
      "Our project managers, engineers, and in-house joinery team deliver the complete turnkey fit-out.",
  },
  {
    id: 5,
    icon: <FaHouseUser />,
    title: "Handover & Support",
    description:
      "A final quality inspection, transparent pricing, and after-sales support on every project.",
  },
];

function ProcessSection() {
  return (
    <section className="bg-[#0b0b0b] py-20 md:py-28">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            From Concept To Completion
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto mt-6 leading-8 text-base lg:text-lg">
            Every project follows a structured process — coordinated by our
            in-house architects, engineers, and joinery team — that ensures
            precision, timely delivery, and complete client satisfaction.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {process.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", }}
              viewport={{ once: true,amount:0.2 }}
              whileHover={{ y: -10, scale: 1.02, }}
              className="relative rounded-2xl p-7 sm:p-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-[#C8A96A]/60 hover:bg-white/[0.07]"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#C8A96A] text-black flex items-center justify-center text-xl sm:text-2xl">
                {item.icon}
              </div>

              <h3 className="text-white text-xl sm:text-2xl font-semibold mt-7">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-7 text-sm sm:text-base">
                {item.description}
              </p>

              {/* <div className="mt-6 text-[#C8A96A] font-bold text-4xl sm:text-5xl opacity-15 select-none">
                0{item.id}
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;