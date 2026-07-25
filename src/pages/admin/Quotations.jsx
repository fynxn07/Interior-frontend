import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaTrash, FaFileInvoiceDollar, FaClock, FaCheckCircle } from "react-icons/fa";
import { useQuotations } from "../../hooks/useQuotations";
import QuotationDetailModal from "../../components/admin/QuotationDetailModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

const STATUS_STYLES = {
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/40",
    approved: "bg-[#34D399]/15 text-[#34D399] border-[#34D399]/40",
    "in-progress": "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/40",
    completed: "bg-[#8B7CFF]/15 text-[#8B7CFF] border-[#8B7CFF]/40",
    rejected: "bg-red-500/15 text-red-400 border-red-500/40",
};

function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

function AdminQuotations() {
    const { quotations, updateQuotation, deleteQuotation } = useQuotations();
    const [statusFilter, setStatusFilter] = useState("All");
    const [viewing, setViewing] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const statusCounts = useMemo(() => {
        const counts = { All: quotations.length };
        quotations.forEach((q) => {
            counts[q.status] = (counts[q.status] || 0) + 1;
        });
        return counts;
    }, [quotations]);

    const filtered =
        statusFilter === "All"
            ? quotations
            : quotations.filter((q) => q.status === statusFilter);

    const pendingCount = quotations.filter((q) => q.status === "pending").length;

    const handleSave = async (id, data) => {
        await updateQuotation(id, data);
        setViewing((v) => (v && v.id === id ? { ...v, ...data } : v));
    };

    return (
        <div className="p-6 lg:p-10">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Quotation Requests
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Review, assign, and track quotation requests from customers.
                </p>
            </div>

            {/* Summary cards */}
            <div className="grid sm:grid-cols-3 gap-5 mb-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#8B7CFF]/15 flex items-center justify-center text-[#8B7CFF]">
                        <FaFileInvoiceDollar />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">{quotations.length}</p>
                        <p className="text-gray-500 text-xs">Total Requests</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                        <FaClock />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">{pendingCount}</p>
                        <p className="text-gray-500 text-xs">Awaiting Review</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#34D399]/15 flex items-center justify-center text-[#34D399]">
                        <FaCheckCircle />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">
                            {statusCounts.approved || 0}
                        </p>
                        <p className="text-gray-500 text-xs">Approved</p>
                    </div>
                </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2.5 mb-6">
                {["All", "pending", "approved", "in-progress", "completed", "rejected"].map((s) => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-all duration-300 capitalize ${statusFilter === s
                                ? "bg-[#8B7CFF] text-white border-[#8B7CFF]"
                                : "text-gray-400 border-white/10 hover:border-[#8B7CFF]/50 hover:text-white"
                            }`}
                    >
                        {s.replace("-", " ")} {statusCounts[s] ? `(${statusCounts[s]})` : ""}
                    </button>
                ))}
            </div>

            {/* List */}
            <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map((q) => (
                        <motion.div
                            layout
                            key={q.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#8B7CFF]/30 transition-colors duration-300"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <p className="text-white font-medium">{q.name}</p>
                                    <span className="text-[#8B7CFF] text-xs font-mono">{q.reference}</span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1 truncate">
                                    {q.service} · {q.budget} · {q.location}
                                </p>
                                <p className="text-gray-600 text-xs mt-1">{timeAgo(q.created_at)}</p>
                            </div>

                            <span
                                className={`w-fit text-xs rounded-full px-3 py-1.5 border capitalize ${STATUS_STYLES[q.status] || STATUS_STYLES.pending}`}
                            >
                                {q.status?.replace("-", " ")}
                            </span>

                            <div className="flex gap-2 flex-shrink-0">
                                <button
                                    onClick={() => setViewing(q)}
                                    aria-label="View request"
                                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#8B7CFF] hover:border-[#8B7CFF]/60 transition-colors"
                                >
                                    <FaEye size={13} />
                                </button>
                                <button
                                    onClick={() => setDeleteTarget(q)}
                                    aria-label="Delete request"
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
                        No quotation requests in this status yet.
                    </p>
                )}
            </motion.div>

            <QuotationDetailModal
                quotation={viewing}
                open={!!viewing}
                onClose={() => setViewing(null)}
                onSave={handleSave}
            />

            <ConfirmDeleteModal
                open={!!deleteTarget}
                itemName={deleteTarget?.reference}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={async () => {
                    if (!deleteTarget) return;

                    try {
                        await deleteQuotation(deleteTarget.id);
                        setDeleteTarget(null);
                    } catch (error) {
                        console.error("Failed to delete quotation:", error);
                    }
                }}
            />
        </div>
    );
}

export default AdminQuotations;