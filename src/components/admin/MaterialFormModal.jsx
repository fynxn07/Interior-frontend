import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import ImageDropzone from "./ImageDropzone";
import ModalPortal from "./ModalPortal";
import { fileToDataUrl } from "../../utils/fileToDataUrl";

const emptyForm = { brand: "", logo: "", category: "", country: "", group: "Material Directory" };

function MaterialFormModal({ open, onClose, onSubmit, initialData, groupOptions }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        brand: initialData.brand || "",
        logo: typeof initialData.logo === "string" ? initialData.logo : "",
        category: initialData.category || "",
        country: initialData.country || "",
        group: initialData.group || "Material Directory",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogo = async (file) => {
    const dataUrl = await fileToDataUrl(file);
    setForm((f) => ({ ...f, logo: dataUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.brand.trim() || !form.logo.trim()) return;
    setSaving(true);
    await onSubmit(form);
    setSaving(false);
  };

  const groups = groupOptions.filter((g) => g !== "All");

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
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#8B7CFF]/40 via-white/5 to-transparent pointer-events-none" />

                <div className="relative w-full max-h-[88vh] rounded-3xl border border-white/10 bg-[#131826]/95 backdrop-blur-2xl shadow-2xl shadow-[#6C5CE7]/10 overflow-y-auto overflow-x-hidden">
                  <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 sticky top-0 bg-[#131826]/95 backdrop-blur-2xl z-10">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                        {initialData ? "Edit Material" : "Add New Material"}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">
                        Appears in the Material Directory on the public site.
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
                    {/* Logo — light backing so transparent/white logos stay visible while uploading */}
                    <div className="mb-6">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Brand Logo
                      </label>
                      <div className="max-w-[220px]">
                        <ImageDropzone
                          value={form.logo}
                          onChange={handleLogo}
                          aspect="aspect-[4/3]"
                          lightBacking
                        />
                      </div>
                      <p className="text-gray-600 text-[11px] mt-2">
                        PNG with transparent background recommended.
                      </p>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Brand Name
                      </label>
                      <input
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Kohler"
                        className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                      />
                    </div>

                    <div className="mt-5 min-w-0">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Category
                      </label>
                      <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sanitaryware & Fixtures"
                        className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mt-5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Country
                        </label>
                        <input
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="e.g. USA"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Group
                        </label>
                        <select
                          name="group"
                          value={form.group}
                          onChange={handleChange}
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B7CFF] transition-colors"
                        >
                          {groups.map((g) => (
                            <option key={g} value={g} className="bg-[#131826]">
                              {g}
                            </option>
                          ))}
                        </select>
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
                        {saving ? "Saving..." : initialData ? "Save Changes" : "Add Material"}
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

export default MaterialFormModal;