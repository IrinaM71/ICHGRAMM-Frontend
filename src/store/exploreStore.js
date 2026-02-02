import { create } from "zustand";
import { api } from "../utils/api";

export const useExploreStore = create((set) => {
  const fetchUserPhotos = async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/photos/user");
      set({ photos: res.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load photos", loading: false });
    }
  };

  return {
    photos: [],
    loading: false,
    error: null,
    fetchUserPhotos,
  };
});
