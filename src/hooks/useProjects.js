import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";
import { buildFormData } from "../utils/buildFormData";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/projects/");
      setProjects(data.results || data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const getById = useCallback(
    (id) => projects.find((p) => String(p.id) === String(id)),
    [projects]
  );

  const fetchOne = useCallback(async (id) => {
    const { data } = await axiosInstance.get(`/projects/${id}/`);
    return data;
  }, []);

  const addProject = useCallback(async (data) => {
    const { gallery, coverImage, ...rest } = data;
    const payload = { ...rest };
    if (coverImage instanceof File) payload.cover_image = coverImage;
    // if coverImage is a string here, it's meaningless on create (no existing image yet) — skip

    const formData = buildFormData(payload);
    const { data: created } = await axiosInstance.post("/projects/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (gallery?.length) {
      for (const item of gallery) {
        if (!(item.url instanceof File)) continue;
        const imgForm = new FormData();
        imgForm.append("image", item.url);
        imgForm.append("type", item.type || "standard");
        await axiosInstance.post(`/projects/${created.id}/gallery/`, imgForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    }
    await fetchProjects();
  }, [fetchProjects]);

  const updateProject = useCallback(async (id, data) => {
    const { gallery, coverImage, ...rest } = data;
    const payload = { ...rest };
    // Only send cover_image if admin actually picked a new file this session —
    // if it's still the existing URL string, omit it so PATCH keeps the current image.
    if (coverImage instanceof File) payload.cover_image = coverImage;

    const formData = buildFormData(payload);
    await axiosInstance.patch(`/projects/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (gallery?.length) {
      for (const item of gallery) {
        if (!(item.url instanceof File)) continue;
        const imgForm = new FormData();
        imgForm.append("image", item.url);
        imgForm.append("type", item.type || "standard");
        await axiosInstance.post(`/projects/${id}/gallery/`, imgForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    }
    await fetchProjects();
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id) => {
    await axiosInstance.delete(`/projects/${id}/`);
    await fetchProjects();
  }, [fetchProjects]);

  const deleteGalleryImage = useCallback(async (projectId, imageId) => {
    await axiosInstance.delete(`/projects/${projectId}/gallery/${imageId}/`);
    await fetchProjects();
  }, [fetchProjects]);

  return {
    projects, loading, error, getById, fetchOne,
    addProject, updateProject, deleteProject, deleteGalleryImage,
  };
}