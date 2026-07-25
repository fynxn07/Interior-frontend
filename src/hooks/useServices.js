import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";
import { buildFormData } from "../utils/buildFormData";

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/services/");
      setServices(Array.isArray(data) ? data : data.results || []);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const getBySlug = useCallback(
    (slug) => services.find((s) => s.slug === slug),
    [services]
  );

  const addService = useCallback(async (data) => {
    const { heroImage, shortDescription, ...rest } = data;
    const payload = { ...rest, short_description: shortDescription };
    if (heroImage instanceof File) payload.hero_image = heroImage;

    const formData = buildFormData(payload);
    await axiosInstance.post("/services/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchServices();
  }, [fetchServices]);

  const updateService = useCallback(async (slug, data) => {
    const { heroImage, shortDescription, ...rest } = data;
    const payload = { ...rest, short_description: shortDescription };
    if (heroImage instanceof File) payload.hero_image = heroImage;

    const formData = buildFormData(payload);
    await axiosInstance.patch(`/services/${slug}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchServices();
  }, [fetchServices]);

  const deleteService = useCallback(async (slugOrId) => {
    await axiosInstance.delete(`/services/${slugOrId}/`);
    await fetchServices();
  }, [fetchServices]);

  return { services, loading, error, getBySlug, addService, updateService, deleteService };
}