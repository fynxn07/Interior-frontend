import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye, FaTrash, FaEnvelopeOpenText, FaEnvelope, FaCheckCircle, FaCircle,
} from "react-icons/fa";
import { useContactMessages } from "../../hooks/useContact";
import MessageDetailModal from "../../components/admin/MessageDetailModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

const STATUS_STYLES = {
  unread: "bg-[#8B7CFF]/15 text-[#8B7CFF] border-[#8B7CFF]/40",
  read: "bg-white/5 text-gray-400 border-white/15",
  replied: "bg-[#34D399]/15 text-[#34D399] border-[#34D399]/40",
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function AdminMessages() {
  const { messages, deleteMessage, markAsRead, replyToMessage } = useContactMessages();
  const [filter, setFilter] = useState("All");
  const [viewing, setViewing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const counts = useMemo(() => {
    const c = { All: messages.length };
    messages.forEach((m) => {
      c[m.status] = (c[m.status] || 0) + 1;
    });
    return c;
  }, [messages]);

  const filtered =
    filter === "All" ? messages : messages.filter((m) => m.status === filter);

  const handleView = (message) => {
    setViewing(message);
    if (message.status === "unread") markAsRead(message.id);
  };

  const handleReply = (id, text) => {
    replyToMessage(id, text);
    setViewing((v) => (v && v.id === id ? { ...v, status: "replied", reply: text } : v));
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Contact Messages
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Messages submitted through the public Contact page.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#8B7CFF]/15 flex items-center justify-center text-[#8B7CFF]">
            <FaEnvelopeOpenText />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{messages.length}</p>
            <p className="text-gray-500 text-xs">Total Messages</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
            <FaEnvelope />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{counts.unread || 0}</p>
            <p className="text-gray-500 text-xs">Unread</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#34D399]/15 flex items-center justify-center text-[#34D399]">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{counts.replied || 0}</p>
            <p className="text-gray-500 text-xs">Replied</p>
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {["All", "unread", "read", "replied"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-all duration-300 capitalize ${
              filter === s
                ? "bg-[#8B7CFF] text-white border-[#8B7CFF]"
                : "text-gray-400 border-white/10 hover:border-[#8B7CFF]/50 hover:text-white"
            }`}
          >
            {s} {counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
      </div>

      {/* List */}
      <motion.div layout className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((m) => (
            <motion.div
              layout
              key={m.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleView(m)}
              className={`rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer transition-colors duration-300 ${
                m.status === "unread"
                  ? "border-[#8B7CFF]/30 bg-[#8B7CFF]/[0.06]"
                  : "border-white/10 bg-white/[0.04] hover:border-[#8B7CFF]/30"
              } backdrop-blur-xl`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {m.status === "unread" ? (
                  <FaCircle size={7} className="text-[#8B7CFF] flex-shrink-0" />
                ) : (
                  <span className="w-[7px] flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className={`truncate ${m.status === "unread" ? "text-white font-semibold" : "text-gray-300 font-medium"}`}>
                    {m.name}
                  </p>
                  <p className="text-gray-500 text-sm truncate mt-0.5">
                    {m.message}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">{timeAgo(m.createdAt)}</p>
                </div>
              </div>

              <span
                className={`w-fit text-xs rounded-full px-3 py-1.5 border capitalize flex-shrink-0 ${STATUS_STYLES[m.status] || STATUS_STYLES.unread}`}
              >
                {m.status}
              </span>

              <div className="flex gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleView(m)}
                  aria-label="View message"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#8B7CFF] hover:border-[#8B7CFF]/60 transition-colors"
                >
                  <FaEye size={13} />
                </button>
                <button
                  onClick={() => setDeleteTarget(m)}
                  aria-label="Delete message"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-500/60 transition-colors"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-16">
            No messages in this category yet.
          </p>
        )}
      </motion.div>

      <MessageDetailModal
        message={viewing}
        open={!!viewing}
        onClose={() => setViewing(null)}
        onReply={handleReply}
      />

      <ConfirmDeleteModal
        open={!!deleteTarget}
        itemName={deleteTarget?.name}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteMessage(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}

export default AdminMessages;