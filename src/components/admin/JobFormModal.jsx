import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import ModalPortal from "./ModalPortal";

const emptyForm = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  description: "",
  responsibilities: "",
  requirements: "",
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

function JobFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        department: initialData.department || "",
        location: initialData.location || "",
        type: initialData.type || "Full-time",
        description: initialData.description || "",
        responsibilities: (initialData.responsibilities || []).join("\n"),
        requirements: (initialData.requirements || []).join("\n"),
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.department.trim()) return;
    setSaving(true);
    await onSubmit({
      ...form,
      responsibilities: form.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
      requirements: form.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
    });
    setSaving(false);
  };

  return (
    <ModalPortal open={open}>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-6"
            >
              <div className="relative w-full max-w-2xl">
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#8B7CFF]/40 via-white/5 to-transparent pointer-events-none" />

                <div className="relative w-full max-h-[88vh] rounded-3xl border border-white/10 bg-[#131826]/95 backdrop-blur-2xl shadow-2xl shadow-[#6C5CE7]/10 overflow-y-auto overflow-x-hidden">
                  <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 sticky top-0 bg-[#131826]/95 backdrop-blur-2xl z-10">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                        {initialData ? "Edit Job Posting" : "Add New Job Posting"}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">
                        Appears on the public Careers page immediately.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      aria-label="Close"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                    <div className="min-w-0">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Job Title
                      </label>
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Senior Interior Designer"
                        className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5 mt-5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Department
                        </label>
                        <input
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Design"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Location
                        </label>
                        <input
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="e.g. Dubai"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Type
                        </label>
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleChange}
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B7CFF] transition-colors"
                        >
                          {JOB_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-[#131826]">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-5 min-w-0">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Brief overview of the role"
                        className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200 resize-none"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mt-5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Responsibilities
                          <span className="text-gray-600 normal-case tracking-normal ml-1">
                            — one per line
                          </span>
                        </label>
                        <textarea
                          name="responsibilities"
                          value={form.responsibilities}
                          onChange={handleChange}
                          rows={6}
                          placeholder={"Develop concept designs\nConduct client consultations"}
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200 resize-none font-mono text-sm"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Requirements
                          <span className="text-gray-600 normal-case tracking-normal ml-1">
                            — one per line
                          </span>
                        </label>
                        <textarea
                          name="requirements"
                          value={form.requirements}
                          onChange={handleChange}
                          rows={6}
                          placeholder={"5+ years experience\nStrong portfolio"}
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200 resize-none font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8 pt-6 border-t border-white/10">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl border border-white/15 text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#8B7CFF]/20 disabled:opacity-60"
                      >
                        {saving ? "Saving..." : initialData ? "Save Changes" : "Add Job Posting"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

export default JobFormModal;