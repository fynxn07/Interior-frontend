import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaArrowRight } from "react-icons/fa";
import { useCareers } from "../../hooks/useCareers";
import ApplyModal from "../../components/careers/ApplyModal";
import NoOpeningsState from "../../components/careers/NoOpeningState";

function Careers() {
  const { jobs, loading } = useCareers();
  const [expandedId, setExpandedId] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const activeJobs = jobs.filter((job) => job.is_active);

  if (loading) {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center">
      <p className="text-gray-400">Loading careers...</p>
    </div>
  );
}

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Header */}
      <section className="relative pt-40 pb-16 px-6 lg:px-10 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A96A]/[0.06] to-transparent pointer-events-none" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm"
        >
          Join Our Team
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          Careers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg"
        >
          45+ years in business, 25+ in-house design and manufacturing
          specialists — build your career with a team that's shaped the
          U.A.E.'s interiors since 1978.
        </motion.p>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="space-y-5">
          {activeJobs.map((job, index) => {
            const isExpanded = expandedId === job.id;
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-[#C8A96A]/40 transition-colors duration-300"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : job.id)}
                  className="w-full text-left p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <FaBriefcase className="text-[#C8A96A]" /> {job.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#C8A96A]" /> {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaClock className="text-[#C8A96A]" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[#C8A96A] font-semibold text-sm whitespace-nowrap">
                    {isExpanded ? "Hide Details" : "View Details"}
                    <FaArrowRight
                      size={12}
                      className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                    />
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 sm:px-8 pb-8 border-t border-white/10 pt-6">
                    <p className="text-gray-300 leading-7 text-sm sm:text-base">
                      {job.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 mt-6">
                      <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                          Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {job.responsibilities?.map((r) => (
                            <li key={r} className="text-gray-400 text-sm flex gap-2">
                              <span className="text-[#C8A96A]">•</span> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements?.map((r) => (
                            <li key={r} className="text-gray-400 text-sm flex gap-2">
                              <span className="text-[#C8A96A]">•</span> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => setApplyingJob(job)}
                      className="inline-flex items-center gap-3 mt-7 bg-[#C8A96A] text-black px-7 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-yellow-500 transition-all duration-300"
                    >
                      Apply Now <FaArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {activeJobs.length === 0 && <NoOpeningsState />}

      </div>

      {applyingJob && (
        <ApplyModal
          job={applyingJob}
          open={!!applyingJob}
          onClose={() => setApplyingJob(null)}
        />
      )}
    </div>
  );
}

export default Careers;