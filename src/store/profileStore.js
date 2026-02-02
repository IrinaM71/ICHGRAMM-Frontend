import { create } from "zustand";
import { api } from "../utils/api";

export const useProfileStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,

  // Получение профиля по ID
  fetchProfile: async (userId) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get(`/users/${userId}`);
      set({ profile: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to load profile", loading: false });
    }
  },

  // Обновление профиля
  updateProfile: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await api.put("/users/update", data);
      set({ profile: res.data, loading: false });
      return true;
    } catch (err) {
      console.error(err);
      set({ error: "Failed to update profile", loading: false });
      return false;
    }
  },
}));
