import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";
import ModalPortal from "./ModalPortal";

function ApplicationDetailModal({ application, open, onClose }) {
  if (!application) return null;

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
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-6"
            >
              <div className="relative w-full max-w-lg">
                <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-[#8B7CFF]/40 via-white/5 to-transparent" />

                <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-3xl border border-white/10 bg-[#131826]/95 backdrop-blur-2xl shadow-2xl shadow-[#6C5CE7]/10">
                  {/* Header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#131826]/95 px-6 py-5 backdrop-blur-2xl sm:px-8">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-white">
                        {application.name}
                      </h3>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        Applied for {application.jobTitle}
                      </p>
                    </div>

                    <button
                      onClick={onClose}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="space-y-5 p-6 sm:p-8">
                    {/* Email */}
                    <a
                      href={`mailto:${application.email}`}
                      className="flex items-center gap-3 text-gray-300 transition-colors hover:text-[#8B7CFF]"
                    >
                      <FaEnvelope className="text-[#8B7CFF]" />
                      {application.email}
                    </a>

                    {/* Phone */}
                    {application.phone && (
                      <a
                        href={`tel:${application.phone}`}
                        className="flex items-center gap-3 text-gray-300 transition-colors hover:text-[#8B7CFF]"
                      >
                        <FaPhone className="text-[#8B7CFF]" />
                        {application.phone}
                      </a>
                    )}

                    {/* Cover Message */}
                    {application.coverMessage && (
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                          Cover Message
                        </p>

                        <p className="text-sm leading-6 text-gray-300">
                          {application.coverMessage}
                        </p>
                      </div>
                    )}

                    {/* Resume */}
                    {application.resume && (
                      <a
                        href={application.resume.dataUrl}
                        download={application.resume.name}
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#8B7CFF]/50"
                      >
                        <span className="flex items-center gap-3 truncate text-sm text-gray-300">
                          <FaFileAlt className="flex-shrink-0 text-[#8B7CFF]" />

                          <span className="truncate">
                            {application.resume.name}
                          </span>
                        </span>

                        <FaDownload className="flex-shrink-0 text-gray-500 transition-colors group-hover:text-[#8B7CFF]" />
                      </a>
                    )}

                    {/* Date */}
                    <p className="border-t border-white/5 pt-3 text-xs text-gray-600">
                      Submitted{" "}
                      {new Date(application.submittedAt).toLocaleString()}
                    </p>
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

export default ApplicationDetailModal;