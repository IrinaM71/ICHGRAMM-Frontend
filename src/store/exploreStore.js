import { create } from "zustand";
import { api } from "../utils/api";

export const useExploreStore = create((set) => ({
  posts: [],

  fetchAllPosts: async () => {
    try {
      const res = await api.get("/posts");
      console.log("RAW RESPONSE:", res);
      console.log("STORE INSTANCE:", Math.random());

      const data = Array.isArray(res.data) ? res.data : [];

      const onlyWithImages = data.filter(
        (post) =>
          post.image && post.image !== "null" && post.image !== "undefined",
      );

      set({ posts: onlyWithImages });
    } catch (err) {
      console.error("Explore error:", err);
    }
  },
}));
