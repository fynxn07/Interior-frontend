import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaImages } from "react-icons/fa";
import ImageDropzone from "./ImageDropzone";
import ModalPortal from "./ModalPortal";

const emptyForm = {
  title: "",
  client: "",
  location: "",
  category: "",
  duration: "",
  status: "",
  featured: false,
  coverImage: "",
  gallery: [],
};


function ProjectFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        client: initialData.client || "",
        location: initialData.location || "",
        category: initialData.category || "",
        duration: initialData.duration || "",
        status: initialData.status || "",
        featured: !!initialData.featured,
        coverImage: initialData.coverImage || "",
        gallery: (initialData.gallery || []).map((g) => ({
          url: g.url || g,
        })),
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCoverImage = (file) => {
    setForm((f) => ({
      ...f,
      coverImage: file,
    }));
  };

  const addGalleryRow = (file) => {
    setForm((f) => ({
      ...f,
      gallery: [
        ...f.gallery,
        {
          url: file,
        },
      ],
    }));
  };

  const removeGalleryRow = (index) => {
    setForm((f) => ({
      ...f,
      gallery: f.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.coverImage) return;

    setSaving(true);
    await onSubmit(form);
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
              <div className="relative w-full max-w-3xl">
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#8B7CFF]/40 via-white/5 to-transparent pointer-events-none" />

                <div className="relative w-full max-h-[88vh] rounded-3xl border border-white/10 bg-[#131826]/95 backdrop-blur-2xl shadow-2xl shadow-[#6C5CE7]/10 overflow-y-auto overflow-x-hidden">
                  <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 sticky top-0 bg-[#131826]/95 backdrop-blur-2xl z-10">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                        {initialData ? "Edit Project" : "Add New Project"}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">
                        {initialData
                          ? "Update the details customers see on the public site."
                          : "This will appear on the public Projects page immediately."}
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
                    {/* Cover image first, full width — the primary visual, not squeezed into a side column */}
                    <div className="mb-6">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Cover Image
                      </label>
                      <ImageDropzone
                        value={form.coverImage}
                        onChange={handleCoverImage}
                        aspect="aspect-[21/9]"
                      />
                      <p className="text-gray-600 text-[11px] mt-2">
                        Appears on the Projects grid and as the hero banner on
                        the project's detail page.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Project Title
                        </label>
                        <input
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Beach Vista"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Client
                        </label>
                        <input
                          name="client"
                          value={form.client}
                          onChange={handleChange}
                          placeholder="e.g. MILA"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mt-5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Location
                        </label>
                        <input
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="e.g. Marina Harbour"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Category
                        </label>
                        <input
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          placeholder="e.g. Residential"
                          list="project-categories"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                        <datalist id="project-categories">
                          <option value="Residential" />
                          <option value="Commercial" />
                          <option value="Hospitality" />
                          <option value="Retail" />
                          <option value="Renovation" />
                        </datalist>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mt-5 min-w-0">
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Duration / Scope
                        </label>
                        <input
                          name="duration"
                          value={form.duration}
                          onChange={handleChange}
                          placeholder="Fit out — Joinery, ceilings..."
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                          Status
                        </label>
                        <input
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                          placeholder="e.g. Completed 2026"
                          className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer w-fit rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 mt-5 hover:border-[#8B7CFF]/40 transition-colors duration-200">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={form.featured}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#8B7CFF]"
                      />
                      <span className="text-sm text-gray-300">
                        Feature on homepage
                      </span>
                    </label>

                    {/* Gallery */}
                    <div className="mt-6">
                      <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 mb-3">
                        <FaImages size={11} /> Gallery Images
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {form.gallery.map((item, index) => (
                          <div key={index}>
                            <ImageDropzone
                              value={item.url}
                              onChange={(file) => {
                                setForm((f) => {
                                  const gallery = [...f.gallery];

                                  gallery[index] = {
                                    url: file,
                                  };

                                  return {
                                    ...f,
                                    gallery,
                                  };
                                });
                              }}
                              onRemove={() => removeGalleryRow(index)}
                              aspect="aspect-square"
                            />
      
                          </div>
                        ))}

                        <ImageDropzone value="" onChange={addGalleryRow} aspect="aspect-square" />
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
                        {saving ? "Saving..." : initialData ? "Save Changes" : "Add Project"}
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

export default ProjectFormModal;