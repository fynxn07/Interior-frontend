import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FaTimes,
    FaEnvelope,
    FaPaperPlane,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";
import ModalPortal from "./ModalPortal";

function MessageDetailModal({ message, open, onClose }) {
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        setReplyText("");
    }, [message]);

    if (!message) return null;

    const mailSubject = encodeURIComponent(
        "Reply from OK Decoration & Building Maintenance LLC"
    );

    const mailBody = encodeURIComponent(
`Hello ${message.name},

Thank you for contacting OK Decoration.

We received your enquiry regarding:

${message.service || "General Enquiry"}

----------------------------------------

${replyText}

----------------------------------------

Regards,

OK Decoration & Building Maintenance LLC

Phone:
+971 55 253 0169

Email:
okdecor6776@gmail.com`
    );

    const replyLink =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(message.email)}` +
        `&su=${mailSubject}` +
        `&body=${mailBody}`;

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
                            <div className="relative w-full max-w-xl">
                                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#8B7CFF]/40 via-white/5 to-transparent pointer-events-none" />

                                <div className="relative w-full max-h-[88vh] rounded-3xl border border-white/10 bg-[#131826]/95 backdrop-blur-2xl shadow-2xl shadow-[#6C5CE7]/10 overflow-y-auto overflow-x-hidden">
                                    <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 sticky top-0 bg-[#131826]/95 backdrop-blur-2xl z-10">
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-semibold text-white truncate">
                                                {message.name}
                                            </h3>

                                            <a
                                                href={`mailto:${message.email}`}
                                                className="flex items-center gap-2 text-gray-400 hover:text-[#8B7CFF] text-xs mt-1 transition-colors truncate"
                                            >
                                                <FaEnvelope size={10} />
                                                {message.email}
                                            </a>
                                        </div>

                                        <button
                                            onClick={onClose}
                                            className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <div className="p-6 sm:p-8 space-y-5">
                                        {message.service && (
                                            <div className="flex flex-wrap gap-2">
                                                <span className="text-xs rounded-full px-3 py-1 bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
                                                    {message.service}
                                                </span>

                                                {message.phone && (
                                                    <a
                                                        href={`tel:${message.phone}`}
                                                        className="text-xs rounded-full px-3 py-1 bg-white/5 text-gray-300 border border-white/10 hover:border-[#8B7CFF]/40 transition-colors"
                                                    >
                                                        {message.phone}
                                                    </a>
                                                )}
                                            </div>
                                        )}

                                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                                            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                                                Message
                                            </p>

                                            <p className="text-gray-300 text-sm leading-6 whitespace-pre-line">
                                                {message.message}
                                            </p>
                                        </div>

                                        <p className="flex items-center gap-2 text-gray-600 text-xs">
                                            <FaClock size={10} />
                                            Received{" "}
                                            {new Date(message.createdAt).toLocaleString()}
                                        </p>

                                        {message.status === "replied" && message.repliedAt && (
                                            <div className="flex items-center gap-2 text-[#34D399] text-xs bg-[#34D399]/10 border border-[#34D399]/25 rounded-lg px-3 py-2">
                                                <FaCheckCircle size={11} />
                                                Replied on{" "}
                                                {new Date(message.repliedAt).toLocaleString()}
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-white/10">
                                            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                Your Reply
                                            </label>

                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                rows={5}
                                                placeholder="Write your reply..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B7CFF] focus:bg-white/[0.07] transition-all duration-200 resize-none text-sm"
                                            />

                                            <a
                                                href={replyLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-full flex items-center justify-center gap-2 mt-4 py-3 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7] text-white font-semibold hover:opacity-90 transition-opacity ${
                                                    !replyText.trim()
                                                        ? "pointer-events-none opacity-50"
                                                        : ""
                                                }`}
                                            >
                                                <FaPaperPlane size={13} />
                                                Reply to Customer
                                            </a>

                                            <p className="text-gray-600 text-[11px] mt-2 text-center">
                                                Opens Gmail with the customer's email pre-filled.
                                            </p>
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

export default MessageDetailModal;