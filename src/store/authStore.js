import { create } from "zustand";
import api from "../api/axios.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || "",
  loading: false,
  error: null,

  setToken: (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
    set({ token });
  },

  registerUser: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/auth/register", data);

      const token = res.data.token;
      get().setToken(token);

      set({ user: res.data.user, loading: false });
      return true;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Error" });
      return false;
    }
  },

  loginUser: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/auth/login", data);

      const token = res.data.token;
      get().setToken(token);

      set({ user: res.data.user, loading: false });
      return true;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Error" });
      return false;
    }
  },

  fetchMe: async () => {
    const token = get().token;
    if (!token) return;

    try {
      set({ loading: true });
      const res = await api.get("/auth/me");
      set({ user: res.data, loading: false });
    } catch (err) {
      console.error(err);
      get().setToken("");
      set({ user: null, loading: false });
    }
  },

  logout: () => {
    get().setToken("");
    set({ user: null });
  },
}));
