import { motion } from "framer-motion";
import { FaHandshake, FaLayerGroup, FaMedal } from "react-icons/fa";

const whyImage =
  "https://i.pinimg.com/736x/6d/bc/b3/6dbcb3cabfeda15752843870137653e2.jpg";

// Straight from the "Our Values" slide (02)
const values = [
  {
    id: 1,
    icon: <FaHandshake />,
    title: "A Legacy Since 1978",
    description:
      "Four decades of continuous operation in the UAE speak for themselves. Generations of clients have returned to us because our name stands for reliability, honesty, and enduring workmanship.",
  },
  {
    id: 2,
    icon: <FaLayerGroup />,
    title: "Transparency at Every Step",
    description:
      "Clear quotations, honest advice, and regular progress reporting. Our clients always know where their project stands — no surprises, no hidden costs.",
  },
  {
    id: 3,
    icon: <FaMedal />,
    title: "Flexible & Responsive",
    description:
      "Design changes, tight deadlines, occupied premises we adapt. Our teams work around client operations and respond quickly when requirements evolve.",
  },
];

function WhyChooseUs() {
  return (
    <section className="relative bg-[#111111] py-20 md:py-28 overflow-hidden">
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
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            It's Not Business, It's Personal
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — image + glass stat */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={whyImage}
              alt="OK Decoration Craftsmanship"
              className="rounded-3xl h-[340px] sm:h-[460px] lg:h-[620px] w-full object-cover"
            />

            {/* Genuine glass card — backdrop-blur, translucent, gold border */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:bottom-8 sm:left-8 bg-black/40 backdrop-blur-xl rounded-xl p-5 sm:p-6 border border-[#C8A96A]/50">
              <h3 className="text-[#C8A96A] text-3xl sm:text-4xl font-bold">350+</h3>
              <p className="text-white text-sm sm:text-base mt-1">Projects Delivered</p>
            </div>
          </motion.div>

          {/* Right — values as feature cards */}
          <div className="space-y-6">
            {values.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ x: 8 }}
                className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-[#C8A96A]/60 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex gap-5 sm:gap-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full bg-[#C8A96A] text-black flex items-center justify-center text-xl sm:text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-lg sm:text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mt-3 leading-7 text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Testimonial — glass, gold-accented */}
            {/* <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 sm:p-8 border border-[#C8A96A]/30 bg-[#C8A96A]/[0.06] backdrop-blur-xl"
            >
              <p className="text-white italic text-base sm:text-lg leading-8">
                "We strive to execute the best piece of work for all our
                clients — keeping the sole objective of customer satisfaction
                in mind."
              </p>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;