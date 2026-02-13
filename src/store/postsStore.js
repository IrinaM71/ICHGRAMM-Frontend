import { create } from "zustand";
import { api } from "../utils/api";
import { useAuthStore } from "./authStore";

export const usePostsStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchFeed: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/posts/feed");
      console.log("FEED RESPONSE:", res.data);
      // ВАЖНО: сохраняем только res.data
      set({ posts: res, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load feed", loading: false });
    }
  },

  fetchMyPosts: async (userId) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get(`/posts/user/${userId}`);

      set({ posts: res, loading: false });

      // если сервер возвращает обновлённого пользователя
      if (res.data.user) {
        useAuthStore.getState().updateUser(res.data.user);
      }
    } catch (err) {
      console.error(err);
      set({ error: "Failed to load posts", loading: false });
    }
  },

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  likePost: async (postId, userId) => {
    set((state) => {
      const updated = state.posts.map((p) => {
        if (p._id !== postId) return p;

        const alreadyLiked = p.likes.includes(userId);

        return {
          ...p,
          likes: alreadyLiked
            ? p.likes.filter((id) => id !== userId)
            : [...p.likes, userId],
        };
      });

      return { posts: updated };
    });

    try {
      await api.post(`/likes/${postId}`);
    } catch (err) {
      console.error("Like error:", err);
    }
  },
}));
