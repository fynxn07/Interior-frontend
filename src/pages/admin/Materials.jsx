import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useMaterials } from "../../hooks/useMaterials";
import MaterialFormModal from "../../components/admin/MaterialFormModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

function AdminMaterials() {
  const { materials, groups, addMaterial, updateMaterial, deleteMaterial } = useMaterials();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? materials : materials.filter((m) => m.group === filter);

  const openAddModal = () => {
    setEditingMaterial(null);
    setModalOpen(true);
  };

  const openEditModal = (material) => {
    setEditingMaterial(material);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingMaterial) {
      await updateMaterial(editingMaterial.id, formData);
    } else {
      await addMaterial(formData);
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    deleteMaterial(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Materials</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the material directory shown on the public website.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7] text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity w-fit shadow-lg shadow-[#8B7CFF]/20"
        >
          <FaPlus size={13} /> Add Material
        </button>
      </div>

      {/* Group filter */}
      <div className="flex flex-wrap gap-2.5 mb-7">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-all duration-300 ${
              filter === g
                ? "bg-[#8B7CFF] text-white border-[#8B7CFF]"
                : "text-gray-400 border-white/10 hover:border-[#8B7CFF]/50 hover:text-white"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((material) => (
            <motion.div
              layout
              key={material.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-[#8B7CFF]/40 transition-colors duration-300"
            >
              <div className="flex items-center justify-center h-28 bg-gradient-to-br from-[#fdfcfa] to-[#efe8db] p-5">
                <img
                  src={material.logo}
                  alt={material.brand}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate">
                      {material.brand}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1.5 truncate">
                      {material.category}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {material.country}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(material)}
                      aria-label="Edit"
                      className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#8B7CFF] hover:border-[#8B7CFF]/60 transition-colors"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(material)}
                      aria-label="Delete"
                      className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-500/60 transition-colors"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5">
                  <span className="inline-block text-[10px] uppercase tracking-wider text-[#8B7CFF] bg-[#8B7CFF]/10 px-2.5 py-1 rounded-full">
                    {material.group}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-20">
          No materials in this category yet.
        </p>
      )}

      <MaterialFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingMaterial}
        groupOptions={groups}
      />

      <ConfirmDeleteModal
        open={!!deleteTarget}
        itemName={deleteTarget?.brand}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default AdminMaterials;