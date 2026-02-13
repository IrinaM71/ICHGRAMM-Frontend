import { create } from "zustand";
import { api } from "../utils/api";

export const useExploreStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchExplore: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/posts/explore");

      // res — это JSON, не axios-response
      const posts = Array.isArray(res) ? res : res.posts || [];

      set({ posts, loading: false });
    } catch (err) {
      console.error("Explore error:", err);
      set({ error: "Failed to load explore posts", loading: false });
    }
  },
}));
