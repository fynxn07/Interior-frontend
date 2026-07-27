import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";
import { buildFormData } from "../utils/buildFormData";


export function useCareers() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    const { data } = await axiosInstance.get("/careers/jobs/");
    setJobs(data);
  }, []);

  const fetchApplications = useCallback(async () => {
    const { data } = await axiosInstance.get("/careers/applications/");
    setApplications(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchJobs(), fetchApplications()]).finally(() => setLoading(false));
  }, [fetchJobs, fetchApplications]);

  const getBySlug = useCallback(
    (slug) => jobs.find((j) => j.slug === slug),
    [jobs]
  );

  const addJob = useCallback(async (data) => {
    await axiosInstance.post("/careers/jobs/", data); // plain JSON, no file fields on Job
    await fetchJobs();
  }, [fetchJobs]);

  const updateJob = useCallback(async (slug, data) => {
    await axiosInstance.patch(`/careers/jobs/${slug}/`, data);
    await fetchJobs();
  }, [fetchJobs]);

  const deleteJob = useCallback(async (slug) => {
    await axiosInstance.delete(`/careers/jobs/${slug}/`);
    await fetchJobs();
  }, [fetchJobs]);

  // Public — resume upload, no auth
  const submitApplication = useCallback(async (data) => {
    const formData = buildFormData(data); // job (id), name, email, phone, cover_message, resume (File)
    const { data: created } = await axiosInstance.post("/careers/applications/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return created;
  }, []);

  const updateApplicationStatus = useCallback(async (id, status) => {
    const { data } = await axiosInstance.patch(`/careers/applications/${id}/status/`, { status });
    setApplications((prev) => prev.map((a) => (a.id === id ? data : a)));
  }, []);

  const deleteApplication = useCallback(async (id) => {
    await axiosInstance.delete(`/careers/applications/${id}/`);
    await fetchApplications();
  }, [fetchApplications]);

  return {
    jobs, applications, loading, getBySlug,
    addJob, updateJob, deleteJob,
    submitApplication, updateApplicationStatus, deleteApplication,
  };
}