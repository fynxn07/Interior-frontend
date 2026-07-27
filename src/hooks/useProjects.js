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

  const addProject = useCallback(
    async (data) => {
      const { gallery, coverImage, ...rest } = data;

      const payload = {
        ...rest,
      };

      if (coverImage instanceof File) {
        payload.cover_image = coverImage;
      }

      if (gallery?.length) {
        payload.gallery_images = gallery
          .map((item) => item.url)
          .filter((file) => file instanceof File);
      }

      const formData = buildFormData(payload);

      await axiosInstance.post("/projects/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProjects();
    },
    [fetchProjects]
  );

  const updateProject = useCallback(
    async (id, data) => {
      const { gallery, coverImage, ...rest } = data;

      const payload = {
        ...rest,
      };

      if (coverImage instanceof File) {
        payload.cover_image = coverImage;
      }

      if (gallery?.length) {
        payload.gallery_images = gallery
          .map((item) => item.url)
          .filter((file) => file instanceof File);
      }

      const formData = buildFormData(payload);

      await axiosInstance.patch(`/projects/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProjects();
    },
    [fetchProjects]
  );

  const deleteProject = useCallback(
    async (id) => {
      await axiosInstance.delete(`/projects/${id}/`);
      await fetchProjects();
    },
    [fetchProjects]
  );

  return {
    projects,
    loading,
    error,
    getById,
    fetchOne,
    addProject,
    updateProject,
    deleteProject,
  };
}