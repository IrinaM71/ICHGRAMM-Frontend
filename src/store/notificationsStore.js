import { create } from "zustand";
import { api } from "../utils/api";

export const useNotificationsStore = create((set) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/notifications");

      set({
        notifications: res.notifications || [],
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Failed to load notifications",
      });
    }
  },

  markAllAsRead: async () => {
    try {
      await api.post("/notifications/mark-all-read");
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  },
}));
