import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";

export function useContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data } = await axiosInstance.get("/contacts/");
    setMessages(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Public — no auth needed, used by the Contact page form
  const sendMessage = useCallback(async (data) => {
    const { data: created } = await axiosInstance.post("/contacts/", data);
    return created;
  }, []);

  const markAsRead = useCallback(async (id) => {
    const { data } = await axiosInstance.get(`/contacts/${id}/`);
    setMessages((prev) => prev.map((m) => (m.id === id ? data : m)));
    return data;
  }, []);

  const replyToMessage = useCallback(async (id, replyText) => {
    const { data } = await axiosInstance.post(`/contacts/${id}/reply/`, { reply: replyText });
    setMessages((prev) => prev.map((m) => (m.id === id ? data : m)));
  }, []);

  const deleteMessage = useCallback(async (id) => {
    await axiosInstance.delete(`/contacts/${id}/`);
    await fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, sendMessage, markAsRead, replyToMessage, deleteMessage };
}