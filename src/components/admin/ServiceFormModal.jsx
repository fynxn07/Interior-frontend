import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaListUl } from "react-icons/fa";
import ImageDropzone from "./ImageDropzone";
import ModalPortal from "./ModalPortal";
import { ICON_OPTIONS, getIcon } from "../../utils/iconMap";

const emptyForm = {
    title: "",
    icon: "FaBuilding",
    shortDescription: "",
    heroImage: "",
    description: "",
    scope: "",
};

function ServiceFormModal({ open, onClose, onSubmit, initialData }) {
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                icon: initialData.icon || "FaBuilding",
                shortDescription: initialData.shortDescription || "",
                heroImage: initialData.heroImage || "",
                description: initialData.description || "",
                scope: (initialData.scope || []).join("\n"),
            });
        } else {
            setForm(emptyForm);
        }
    }, [initialData, open]);

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleHeroImage = (file) => {
        setForm((f) => ({
            ...f,
            heroImage: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.heroImage) return;
        setSaving(true);
        await onSubmit(form);
        setSaving(false);
    };

    const PreviewIcon = getIcon(form.icon);

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
                                                {initialData ? "Edit Service" : "Add New Service"}
                                            </h3>
                                            <p className="text-gray-500 text-xs mt-1">
                                                {initialData
                                                    ? "Update what customers see on the Services page."
                                                    : "Appears on the public Services page and homepage immediately."}
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
                                        {/* Hero image — full width, primary visual */}
                                        <div className="mb-6">
                                            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                Hero Image
                                            </label>
                                            <ImageDropzone
                                                value={form.heroImage}
                                                onChange={handleHeroImage}
                                                aspect="aspect-[21/9]"
                                            />
                                            <p className="text-gray-600 text-[11px] mt-2">
                                                Shown on the Services listing card and as the banner
                                                on this service's detail page.
                                            </p>
                                        </div>

                                        <div className="min-w-0">
                                            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                Service Title
                                            </label>
                                            <input
                                                name="title"
                                                value={form.title}
                                                onChange={handleChange}
                                                required
                                                placeholder="e.g. Interior Design / Consultation"
                                                className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-[1fr,auto] gap-5 mt-5 items-end min-w-0">
                                            <div className="min-w-0">
                                                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                    Icon
                                                </label>
                                                <select
                                                    name="icon"
                                                    value={form.icon}
                                                    onChange={handleChange}
                                                    className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B7CFF] transition-colors"
                                                >
                                                    {ICON_OPTIONS.map((opt) => (
                                                        <option key={opt} value={opt} className="bg-[#131826]">
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {/* Live icon preview */}
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B7CFF] to-[#6C5CE7] text-white flex items-center justify-center text-lg flex-shrink-0">
                                                <PreviewIcon />
                                            </div>
                                        </div>

                                        <div className="mt-5 min-w-0">
                                            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                Short Description
                                                <span className="text-gray-600 normal-case tracking-normal ml-1.5">
                                                    (shown on cards)
                                                </span>
                                            </label>
                                            <input
                                                name="shortDescription"
                                                value={form.shortDescription}
                                                onChange={handleChange}
                                                required
                                                placeholder="One line summary for the service card"
                                                className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200"
                                            />
                                        </div>

                                        <div className="mt-5 min-w-0">
                                            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                Full Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                placeholder="Detailed description shown on the service's detail page"
                                                className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200 resize-none"
                                            />
                                        </div>

                                        <div className="mt-5 min-w-0">
                                            <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                <FaListUl size={11} /> Scope of Work
                                                <span className="text-gray-600 normal-case tracking-normal ml-1">
                                                    — one item per line
                                                </span>
                                            </label>
                                            <textarea
                                                name="scope"
                                                value={form.scope}
                                                onChange={handleChange}
                                                rows={5}
                                                placeholder={"Consultation\nSite Survey\n3D Visualization"}
                                                className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200 resize-none font-mono text-sm"
                                            />
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
                                                {saving ? "Saving..." : initialData ? "Save Changes" : "Add Service"}
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

export default ServiceFormModal;