import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { useContactMessages } from "../../hooks/useContact";
import { useServices } from "../../hooks/useServices";

const initialForm = { name: "", email: "", phone: "", service: "", message: "" };

function ContactForm() {
  const { sendMessage } = useContactMessages();
  const { services } = useServices();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (!form.message.trim()) err.message = "Please add a short message";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setStatus("sending");
    await sendMessage(form);
    setStatus("sent");
    setForm(initialForm);
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 sm:p-9">
      <h3 className="text-2xl sm:text-3xl font-bold text-white">
        Send Us a Message
      </h3>
      <p className="text-gray-400 mt-2 text-sm sm:text-base">
        Fill in your details and our team will get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.name ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
              Phone (optional)
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+971 XX XXX XXXX"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A96A] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.email ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Service You're Interested In
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C8A96A] transition-colors"
          >
            <option value="" className="bg-[#171717]">
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title} className="bg-[#171717]">
                {s.title}
              </option>
            ))}
            <option value="Other" className="bg-[#171717]">
              Other
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about your project..."
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
              errors.message ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
            }`}
          />
          {errors.message && (
            <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full inline-flex items-center justify-center gap-3 bg-[#C8A96A] text-black px-8 py-4 rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-yellow-500 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "sending" ? (
            "Sending..."
          ) : (
            <>
              Send Message <FaPaperPlane size={14} />
            </>
          )}
        </button>

        <AnimatePresence>
          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400 text-sm"
            >
              <FaCheckCircle />
              Message sent successfully! We'll be in touch soon.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

export default ContactForm;