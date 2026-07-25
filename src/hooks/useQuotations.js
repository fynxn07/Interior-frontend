import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";

export function useQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchQuotations = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.get("/quotations/");
      setQuotations(data);
      setError(null)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  // Public submission — matches your 4-step wizard exactly
  const submitQuotation = useCallback(async (formState) => {
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("phone", formState.phone || "");
    formData.append("service", formState.service || "");
    formData.append("description", formState.description || "");
    formData.append("budget", formState.budget || "");
    formData.append("location", formState.location || "");
    if (formState.preferredDate) formData.append("preferred_date", formState.preferredDate);

    (formState.images || []).forEach((img) => {
      if (img.file instanceof File) formData.append("images", img.file);
    });

    const { data } = await axiosInstance.post("/quotations/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data; // includes server-generated `reference`
  }, []);

  const updateQuotation = useCallback(async (id, data) => {
    const { data: updated } = await axiosInstance.patch(`/quotations/${id}/`, data);
    setQuotations((prev) => prev.map((q) => (q.id === id ? updated : q)));
    return updated;
  }, []);

  const deleteQuotation = useCallback(async (id) => {
    await axiosInstance.delete(`/quotations/${id}/`);
    await fetchQuotations();
  }, [fetchQuotations]);

  return { quotations, loading,error, submitQuotation, updateQuotation, deleteQuotation };
}