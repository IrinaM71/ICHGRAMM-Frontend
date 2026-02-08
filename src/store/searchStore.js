import { create } from "zustand";
import { api } from "../utils/api";

export const useSearchStore = create((set) => ({
  results: [],
  loading: false,
  error: null,

  searchUsers: async (query) => {
    if (!query.trim()) {
      set({ results: [] });
      return;
    }

    try {
      set({ loading: true, error: null });

      const res = await api.get(`/search/users?q=${query}`);

      set({
        results: res.data || [],
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Search failed",
      });
    }
  },
}));
