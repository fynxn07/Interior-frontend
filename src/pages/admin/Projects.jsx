import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";
import ProjectFormModal from "../../components/admin/ProjectFormModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject, fetchOne  } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loadingEdit, setLoadingEdit] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const openAddModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEditModal = async (project) => {
    setLoadingEdit(true);
    try {
      const fullProject = await fetchOne(project.id); // full detail, includes gallery
      setEditingProject(fullProject);
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to load project details:", err);
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleSubmit = (formData) => {
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    deleteProject(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the portfolio shown on the public website.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7] text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity w-fit shadow-lg shadow-[#8B7CFF]/20"
        >
          <FaPlus size={13} /> Add Project
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2.5 mb-7">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-all duration-300 ${filter === cat
                ? "bg-[#8B7CFF] text-white border-[#8B7CFF]"
                : "text-gray-400 border-white/10 hover:border-[#8B7CFF]/50 hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-[#8B7CFF]/40 transition-colors duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {project.featured && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#8B7CFF]/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-white font-semibold">
                    <FaStar size={9} /> Featured
                  </span>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                  {project.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1.5">
                      <FaMapMarkerAlt size={10} className="text-[#8B7CFF] flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 truncate">
                      {project.client} · {project.status}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(project)}
                      disabled={loadingEdit}
                      aria-label="Edit"
                      className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#8B7CFF] hover:border-[#8B7CFF]/60 transition-colors"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(project)}
                      aria-label="Delete"
                      className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-500/60 transition-colors"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-20">
          No projects in this category yet.
        </p>
      )}

      <ProjectFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProject}
      />

      <ConfirmDeleteModal
        open={!!deleteTarget}
        itemName={deleteTarget?.title}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default AdminProjects;