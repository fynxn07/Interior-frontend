import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaInstagram,
} from "react-icons/fa";
import ContactForm from "../../components/contact/ContactForm";

const infoCards = [
  {
    icon: FaMapMarkerAlt,
    label: "Office Address",
    lines: ["Al Qusais Industrial Area 4", "Dubai 6776, U.A.E."],
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    lines: [
      {
        text: "+971 4 267 9470",
        href: "tel:+97142679470",
      },
    ],
  },
  {
    icon: FaWhatsapp,
    label: "Mobile / WhatsApp",
    lines: [
      {
        text: "+971 55 253 0169",
        href: "https://wa.me/971552530169",
      },
      {
        text: "+971 52 825 6790",
        href: "https://wa.me/971528256790",
      },
    ],
  },
  {
    icon: FaEnvelope,
    label: "Email",
    lines: [
      {
        text: "okdecor6776@gmail.com",
        href: "mailto:okdecor6776@gmail.com",
      },
    ],
  },
  {
    icon: FaClock,
    label: "Working Hours",
    lines: ["Monday – Saturday", "8:00 AM – 6:00 PM"],
  },
];

function Contacts() {
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
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          Let's Build Something Exceptional
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg"
        >
          Whether you're planning a new fit-out, a renovation, or ongoing
          building maintenance, our team is ready to discuss your
          requirements and provide a detailed proposal.
        </motion.p>
      </section>

      {/* Main content */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Form — takes more visual weight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {infoCards.map((card) => {
              const Icon = card.icon;

              const content = (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C8A96A]/15 border border-[#C8A96A]/40 flex items-center justify-center text-[#C8A96A] flex-shrink-0">
                    <Icon />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      {card.label}
                    </p>

                    {card.lines.map((line, index) => {
                      if (typeof line === "string") {
                        return (
                          <p
                            key={index}
                            className="text-white font-medium mt-0.5"
                          >
                            {line}
                          </p>
                        );
                      }

                      return (
                        <a
                          key={index}
                          href={line.href}
                          target={line.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="block mt-0.5 font-medium text-white hover:text-[#C8A96A] transition-colors"
                        >
                          {line.text}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );

              return (
                <div
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-[#C8A96A]/50 hover:bg-white/[0.07] transition-all duration-300"
                >
                  {content}
                </div>
              );
            })}

            {/* Social */}
            <div className="rounded-2xl border border-[#C8A96A]/30 bg-[#C8A96A]/[0.06] backdrop-blur-xl p-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Follow Us
                </p>
                <a
                  href="https://instagram.com/okdecoration"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white font-medium mt-0.5 hover:text-[#C8A96A] transition-colors"
                >
                  @okdecoration
                </a>
              </div>

              <a
                href="https://instagram.com/okdecoration"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full bg-[#C8A96A] text-black flex items-center justify-center text-lg hover:scale-110 transition-transform duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-2xl overflow-hidden border border-white/10 h-[380px] sm:h-[440px]"
        >
          <iframe
            title="OK Decoration Office Location"
            src="https://www.google.com/maps?q=Al+Qusais+Industrial+Area+4,+Dubai&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </div>
  );
}

export default Contacts;