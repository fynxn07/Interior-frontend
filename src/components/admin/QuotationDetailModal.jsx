import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
  FaWallet, FaTools, FaUserTie, FaSave,
} from "react-icons/fa";
import ModalPortal from "./ModalPortal";

const STATUS_OPTIONS = ["pending", "approved", "in-progress", "completed", "rejected"];

function QuotationDetailModal({ quotation, open, onClose, onSave }) {
  const [status, setStatus] = useState("pending");
  const [price, setPrice] = useState("");
  const [remarks, setRemarks] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (quotation) {
      setStatus(quotation.status || "pending");
      setPrice(quotation.price || "");
      setRemarks(quotation.remarks || "");
      setAssignedTo(quotation.assignedTo || "");
      setSaved(false);
    }
  }, [quotation]);

  if (!quotation) return null;

  const handleSave = async () => {
    setSaving(true);
    await onSave(quotation.id, { status, price, remarks, assignedTo });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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

                <div className="relative w-full max-h-[90vh] rounded-3xl border border-white/10 bg-[#131826]/95 backdrop-blur-2xl shadow-2xl shadow-[#6C5CE7]/10 overflow-y-auto overflow-x-hidden">
                  <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 sticky top-0 bg-[#131826]/95 backdrop-blur-2xl z-10">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                        {quotation.name}
                      </h3>
                      <p className="text-[#8B7CFF] text-xs mt-1 font-mono">
                        {quotation.reference}
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

                  <div className="p-6 sm:p-8 grid lg:grid-cols-5 gap-8">
                    {/* Left — request details, read-only */}
                    <div className="lg:col-span-3 space-y-5 min-w-0">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <a href={`mailto:${quotation.email}`} className="flex items-center gap-2.5 text-gray-300 hover:text-[#8B7CFF] transition-colors text-sm min-w-0">
                          <FaEnvelope className="text-[#8B7CFF] flex-shrink-0" />
                          <span className="truncate">{quotation.email}</span>
                        </a>
                        {quotation.phone && (
                          <a href={`tel:${quotation.phone}`} className="flex items-center gap-2.5 text-gray-300 hover:text-[#8B7CFF] transition-colors text-sm min-w-0">
                            <FaPhone className="text-[#8B7CFF] flex-shrink-0" />
                            <span className="truncate">{quotation.phone}</span>
                          </a>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                            <FaTools size={10} /> Service
                          </p>
                          <p className="text-white text-sm truncate">{quotation.service || "—"}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                            <FaWallet size={10} /> Budget
                          </p>
                          <p className="text-white text-sm truncate">{quotation.budget || "—"}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">
                            <FaMapMarkerAlt size={10} /> Location
                          </p>
                          <p className="text-white text-sm truncate">{quotation.location || "—"}</p>
                        </div>
                      </div>

                      {quotation.preferredDate && (
                        <div className="flex items-center gap-2.5 text-gray-400 text-sm">
                          <FaCalendarAlt className="text-[#8B7CFF]" />
                          Preferred start: {new Date(quotation.preferredDate).toLocaleDateString()}
                        </div>
                      )}

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                          Project Description
                        </p>
                        <p className="text-gray-300 text-sm leading-6">
                          {quotation.description || "No description provided."}
                        </p>
                      </div>

                      {quotation.images?.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2.5">
                            Reference Photos ({quotation.images.length})
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {quotation.images.map((img, i) => (
                            <a
                                key={i}
                                href={img.dataUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-[#8B7CFF]/50 transition-colors"
                              >
                                <img src={img.dataUrl} alt="" className="w-full h-full object-cover" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-gray-600 text-xs pt-2">
                        Submitted {new Date(quotation.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Right — admin actions */}
                    <div className="lg:col-span-2 space-y-5 min-w-0">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-5">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                            Status
                          </label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm capitalize focus:outline-none focus:border-[#8B7CFF] transition-colors"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} className="bg-[#131826] capitalize">
                                {s.replace("-", " ")}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-400 mb-2">
                            <FaUserTie size={10} /> Assigned To
                            <span className="text-gray-600 normal-case tracking-normal">
                              (placeholder)
                            </span>
                          </label>
                          <input
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            placeholder="Staff member name"
                            className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                            Quoted Price (AED)
                          </label>
                          <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g. 85,000"
                            className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                            Remarks to Customer
                          </label>
                          <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows={4}
                            placeholder="Internal notes or a message the customer will see..."
                            className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] transition-colors resize-none"
                          />
                        </div>

                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                        >
                          {saving ? (
                            "Saving..."
                          ) : saved ? (
                            "Saved ✓"
                          ) : (
                            <>
                              <FaSave size={13} /> Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

export default QuotationDetailModal;