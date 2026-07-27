import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";
import { buildFormData } from "../utils/buildFormData";

export function useMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/materials/");
      // Defensive: only ever set an array, no matter what came back
      setMaterials(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch materials:", err.response?.status, err.response?.data || err.message);
      setError(err);
      setMaterials([]); // never leave it in a broken state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const groups = [
    "All",
    "Material Directory",
    "Materials & Colour",
  ];

  const addMaterial = useCallback(async (data) => {
    const { logo, ...rest } = data;
    const payload = { ...rest };
    if (logo instanceof File) payload.logo = logo;

    const formData = buildFormData(payload);
    await axiosInstance.post("/materials/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchMaterials();
  }, [fetchMaterials]);

  const updateMaterial = useCallback(async (id, data) => {
    const { logo, ...rest } = data;
    const payload = { ...rest };
    if (logo instanceof File) payload.logo = logo;

    const formData = buildFormData(payload);
    await axiosInstance.patch(`/materials/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchMaterials();
  }, [fetchMaterials]);

  const deleteMaterial = useCallback(async (id) => {
    await axiosInstance.delete(`/materials/${id}/`);
    await fetchMaterials();
  }, [fetchMaterials]);

  return { materials, loading, error, groups, addMaterial, updateMaterial, deleteMaterial };
}