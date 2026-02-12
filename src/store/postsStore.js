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
      set({ posts: res, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load feed", loading: false });
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
            ? p.likes.filter((id) => id !== userId) // убираем лайк
            : [...p.likes, userId], // добавляем лайк
        };
      });

      return { posts: updated };
    });

    // отправляем запрос на сервер
    try {
      await api.post(`/likes/${postId}`);
    } catch (err) {
      console.error("Like error:", err);
    }
  },
}));
