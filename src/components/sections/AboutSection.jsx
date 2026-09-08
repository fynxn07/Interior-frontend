import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/img9.jpg";


const highlights = [
  "Interior Design & Consultation",
  "Complete Fit-Out Solutions",
  "In-House Custom Joinery",
];

function AboutSection() {
  return (
    <section className="bg-[#111111] py-20 md:py-28 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glass tag over the image */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#C8A96A]" />
              <span className="text-xs uppercase tracking-widest text-white">
                Since 1978
              </span>
            </div>

            <img
              src={aboutImage}
              alt="OK Decoration — Interior Craftsmanship"
              className="rounded-2xl w-full h-[380px] sm:h-[480px] lg:h-[620px] object-cover"
            />

            {/* Solid gold stat card, glass-bordered on mobile too */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 lg:-bottom-10 lg:-right-8 bg-[#C8A96A] p-6 sm:p-8 rounded-xl shadow-2xl shadow-black/40">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                45+
              </h2>
              <p className="mt-2 font-semibold text-black text-sm sm:text-base">
                Years in Business
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm">
              About OK Decoration
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Focused On Legacy
              <br />
              And Precision.
            </h2>

            <p className="text-gray-400 mt-8 leading-8 text-base lg:text-lg">
              Since 1978, OK Decoration has defined the standard for interior
              excellence throughout the U.A.E. We specialize in transforming
              complex visions into reality — providing end-to-end turnkey
              solutions for residential estates, corporate hubs, and
              world-class hospitality venues, with rigorous adherence to
              design specifications on every project.
            </p>

            <div className="mt-10 space-y-5">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-3 w-3 rounded-full bg-[#C8A96A] flex-shrink-0" />
                  <p className="text-white">{item}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-block mt-12 bg-[#C8A96A] px-8 py-4 rounded-lg font-semibold text-black hover:bg-yellow-500 hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;