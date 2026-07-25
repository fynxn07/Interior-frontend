import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaBriefcase,
    FaEye, FaUserCircle,
} from "react-icons/fa";
import { useCareers } from "../../hooks/useCareers";
import JobFormModal from "../../components/admin/JobFormModal";
import ApplicationDetailModal from "../../components/admin/ApplicationDetailModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

const STATUS_STYLES = {
    new: "bg-[#8B7CFF]/15 text-[#8B7CFF] border-[#8B7CFF]/40",
    reviewed: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/40",
    shortlisted: "bg-[#34D399]/15 text-[#34D399] border-[#34D399]/40",
    rejected: "bg-red-500/15 text-red-400 border-red-500/40",
};

function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days < 1) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
}

function AdminCareers() {
    const {
        jobs, applications, addJob, updateJob, deleteJob,
        updateApplicationStatus, deleteApplication,
    } = useCareers();

    const [tab, setTab] = useState("jobs"); // "jobs" | "applications"

    // Job posting modal state
    const [jobModalOpen, setJobModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [deleteJobTarget, setDeleteJobTarget] = useState(null);

    // Application state
    const [viewingApplication, setViewingApplication] = useState(null);
    const [deleteAppTarget, setDeleteAppTarget] = useState(null);

    const openAddJob = () => {
        setEditingJob(null);
        setJobModalOpen(true);
    };

    const openEditJob = (job) => {
        setEditingJob(job);
        setJobModalOpen(true);
    };

    const handleJobSubmit = async (data) => {
        try {
            if (editingJob) {
                await updateJob(editingJob.slug, data);
            } else {
                await addJob(data);
            }

            setJobModalOpen(false);
        } catch (error) {
            console.error("Failed to save job:", error);
        }
    };

    return (
        <div className="p-6 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Careers</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage job postings and review candidate applications.
                    </p>
                </div>
                {tab === "jobs" && (
                    <button
                        onClick={openAddJob}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7] text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity w-fit shadow-lg shadow-[#8B7CFF]/20"
                    >
                        <FaPlus size={13} /> Add Job Posting
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-white/10">
                {[
                    { id: "jobs", label: "Job Postings", count: jobs.length },
                    { id: "applications", label: "Applications", count: applications.length },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`relative px-5 py-3 text-sm font-medium transition-colors ${tab === t.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {t.label}
                        <span className="ml-2 text-xs text-gray-500">({t.count})</span>
                        {tab === t.id && (
                            <motion.span
                                layoutId="careers-tab-underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* ---------- Job Postings tab ---------- */}
            {tab === "jobs" && (
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {jobs.map((job) => (
                            <motion.div
                                layout
                                key={job.id}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -4 }}
                                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-[#8B7CFF]/40 transition-colors duration-300"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-white font-semibold leading-snug">
                                        {job.title}
                                    </h3>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => openEditJob(job)}
                                            aria-label="Edit"
                                            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#8B7CFF] hover:border-[#8B7CFF]/60 transition-colors"
                                        >
                                            <FaEdit size={12} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteJobTarget(job)}
                                            aria-label="Delete"
                                            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-500/60 transition-colors"
                                        >
                                            <FaTrash size={11} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <FaBriefcase size={10} className="text-[#8B7CFF]" /> {job.department}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FaMapMarkerAlt size={10} className="text-[#8B7CFF]" /> {job.location}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-500">
                                        {job.type}
                                    </span>
                                    <span className="text-[10px] text-gray-600">
                                        /{job.slug}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {jobs.length === 0 && (
                        <p className="text-gray-500 text-sm col-span-full text-center py-16">
                            No job postings yet — click "Add Job Posting" to create one.
                        </p>
                    )}
                </motion.div>
            )}

            {/* ---------- Applications tab ---------- */}
            {tab === "applications" && (
                <motion.div layout className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {applications.map((app) => (
                            <motion.div
                                layout
                                key={app.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                            >
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B7CFF] to-[#6C5CE7] flex items-center justify-center text-white flex-shrink-0">
                                    <FaUserCircle size={18} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{app.name}</p>
                                    <p className="text-gray-400 text-sm truncate">
                                        Applied for <span className="text-gray-300">{app.jobTitle}</span>
                                    </p>
                                    <p className="text-gray-600 text-xs mt-1">{timeAgo(app.submittedAt)}</p>
                                </div>

                                <select
                                    value={app.status}
                                    onChange={async (e) => {
                                        try {
                                            await updateApplicationStatus(app.id, e.target.value);
                                        } catch (error) {
                                            console.error("Failed to update application status:", error);
                                        }
                                    }}
                                    className={`w-fit text-xs rounded-full px-3 py-1.5 border focus:outline-none capitalize ${STATUS_STYLES[app.status] || STATUS_STYLES.new}`}
                                >
                                    <option value="new" className="bg-[#131826] text-white">New</option>
                                    <option value="reviewed" className="bg-[#131826] text-white">Reviewed</option>
                                    <option value="shortlisted" className="bg-[#131826] text-white">Shortlisted</option>
                                    <option value="rejected" className="bg-[#131826] text-white">Rejected</option>
                                </select>

                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => setViewingApplication(app)}
                                        aria-label="View application"
                                        className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#8B7CFF] hover:border-[#8B7CFF]/60 transition-colors"
                                    >
                                        <FaEye size={13} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteAppTarget(app)}
                                        aria-label="Delete application"
                                        className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-500/60 transition-colors"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {applications.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-16">
                            No applications received yet.
                        </p>
                    )}
                </motion.div>
            )}

            {/* Modals */}
            <JobFormModal
                open={jobModalOpen}
                onClose={() => setJobModalOpen(false)}
                onSubmit={handleJobSubmit}
                initialData={editingJob}
            />

            <ApplicationDetailModal
                application={viewingApplication}
                open={!!viewingApplication}
                onClose={() => setViewingApplication(null)}
            />

            <ConfirmDeleteModal
                open={!!deleteJobTarget}
                itemName={deleteJobTarget?.title}
                onCancel={() => setDeleteJobTarget(null)}
                onConfirm={async () => {
                    if (!deleteJobTarget) return;

                    try {
                        await deleteJob(deleteJobTarget.slug);
                        setDeleteJobTarget(null);
                    } catch (error) {
                        console.error("Failed to delete job:", error);
                    }
                }}
            />

            <ConfirmDeleteModal
                open={!!deleteAppTarget}
                itemName={deleteAppTarget?.name}
                onCancel={() => setDeleteAppTarget(null)}
                onConfirm={async () => {
                    if (!deleteAppTarget) return;

                    try {
                        await deleteApplication(deleteAppTarget.id);
                        setDeleteAppTarget(null);
                    } catch (error) {
                        console.error("Failed to delete application:", error);
                    }
                }}
            />
        </div>
    );
}

export default AdminCareers;