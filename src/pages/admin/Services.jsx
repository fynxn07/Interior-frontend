import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaListUl } from "react-icons/fa";
import { useServices } from "../../hooks/useServices";
import { getIcon } from "../../utils/iconMap";
import ServiceFormModal from "../../components/admin/ServiceFormModal";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

function AdminServices() {
  const { services, addService, updateService, deleteService } = useServices();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAddModal = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingService) {
      await updateService(editingService.id, formData);
    } else {
      await addService(formData);
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    deleteService(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Services</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the services shown on the public website.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B7CFF] to-[#6C5CE7] text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity w-fit shadow-lg shadow-[#8B7CFF]/20"
        >
          <FaPlus size={13} /> Add Service
        </button>
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-[#8B7CFF]/40 transition-colors duration-300"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B7CFF] to-[#6C5CE7] text-white flex items-center justify-center text-lg shadow-lg shadow-black/30">
                    <Icon />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold truncate">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1.5 line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => openEditModal(service)}
                        aria-label="Edit"
                        className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#8B7CFF] hover:border-[#8B7CFF]/60 transition-colors"
                      >
                        <FaEdit size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(service)}
                        aria-label="Delete"
                        className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-500/60 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-xs mt-4 pt-4 border-t border-white/5">
                    <FaListUl size={10} />
                    {service.scope?.length || 0} scope items
                    <span className="mx-1">·</span>
                    <span className="truncate">/{service.slug}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {services.length === 0 && (
        <p className="text-center text-gray-500 py-20">
          No services added yet.
        </p>
      )}

      <ServiceFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingService}
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

export default AdminServices;