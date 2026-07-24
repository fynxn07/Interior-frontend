import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";
import { buildFormData } from "../utils/buildFormData";

export function useMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    const { data } = await axiosInstance.get("/materials/");
    setMaterials(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const groups = ["All", ...new Set(materials.map((m) => m.group))];

  const addMaterial = useCallback(async (data) => {
    const formData = buildFormData(data);
    await axiosInstance.post("/materials/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchMaterials();
  }, [fetchMaterials]);

  const updateMaterial = useCallback(async (id, data) => {
    const formData = buildFormData(data);
    await axiosInstance.patch(`/materials/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchMaterials();
  }, [fetchMaterials]);

  const deleteMaterial = useCallback(async (id) => {
    await axiosInstance.delete(`/materials/${id}/`);
    await fetchMaterials();
  }, [fetchMaterials]);

  return { materials, loading, groups, addMaterial, updateMaterial, deleteMaterial };
}