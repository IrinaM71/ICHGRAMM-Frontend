import { create } from "zustand";
import { api } from "../utils/api";

export const usePostsStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchFeed: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/posts/feed");
      set({ posts: res.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load feed", loading: false });
    }
  },

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
}));
