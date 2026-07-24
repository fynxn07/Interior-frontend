import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import ModalPortal from "./ModalPortal";

function ConfirmDeleteModal({ open, itemName, onCancel, onConfirm }) {
  return (
    <ModalPortal open={open}>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCancel}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[111] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#131826] p-7 text-center shadow-2xl shadow-black/50">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xl mx-auto mb-5">
                  <FaExclamationTriangle />
                </div>
                <h3 className="text-white text-lg font-semibold">
                  Delete "{itemName}"?
                </h3>
                <p className="text-gray-400 text-sm mt-3">
                  This action can't be undone. This item will be permanently removed.
                </p>
                <div className="flex gap-3 mt-7">
                  <button
                    onClick={onCancel}
                    className="flex-1 py-2.5 rounded-lg border border-white/15 text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    No, Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

export default ConfirmDeleteModal;