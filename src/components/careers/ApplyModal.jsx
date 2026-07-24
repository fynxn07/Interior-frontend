import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";
import { useCareers } from "../../hooks/useCareers";

const initialForm = { name: "", email: "", phone: "", coverMessage: "", resume: null };

function ApplyModal({ job, open, onClose }) {
  const { submitApplication } = useCareers();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, resume: { name: file.name, dataUrl: reader.result } }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (!form.resume) err.resume = "Please attach your resume";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setSubmitting(true);
    await submitApplication({ jobTitle: job.title, jobSlug: job.slug, ...form });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm(initialForm);
      setErrors({});
      setSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#171717] shadow-2xl">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 sticky top-0 bg-[#171717] z-10">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    Apply for {job.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {job.department} · {job.location}
                  </p>
                </div>
                <button onClick={handleClose} className="text-gray-400 hover:text-white text-xl" aria-label="Close">
                  <FaTimes />
                </button>
              </div>

              {submitted ? (
                <div className="p-8 sm:p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#C8A96A] text-black flex items-center justify-center text-xl mx-auto">
                    <FaCheckCircle />
                  </div>
                  <h4 className="text-white text-lg font-semibold mt-5">
                    Application Submitted
                  </h4>
                  <p className="text-gray-400 text-sm mt-2">
                    Thank you for applying — our HR team will review your
                    application and reach out if there's a match.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-7 bg-[#C8A96A] text-black px-7 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.name ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                          errors.email ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Phone
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
                      Cover Message (optional)
                    </label>
                    <textarea
                      name="coverMessage"
                      value={form.coverMessage}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A96A] transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                      Resume
                    </label>
                    <label
                      className={`flex items-center gap-3 rounded-lg border-2 border-dashed px-4 py-4 cursor-pointer transition-colors ${
                        errors.resume ? "border-red-500" : "border-white/15 hover:border-[#C8A96A]/50"
                      }`}
                    >
                      <FaCloudUploadAlt className="text-[#C8A96A] text-xl flex-shrink-0" />
                      <span className="text-sm text-gray-300 truncate">
                        {form.resume ? form.resume.name : "Click to upload PDF or DOC"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </label>
                    {errors.resume && <p className="text-red-400 text-xs mt-1.5">{errors.resume}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#C8A96A] text-black px-8 py-3.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ApplyModal;