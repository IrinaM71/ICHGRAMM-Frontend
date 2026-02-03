import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || "",
  loading: false,
  error: null,

  // Устанавливаем токен в axios
  setToken: (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
    set({ token });
  },

  // Регистрация
  registerUser: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post("/api/auth/register", data);

      const token = res.data.token;
      get().setToken(token);

      set({ user: res.data.user, loading: false });
      return true;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Error" });
      return false;
    }
  },

  // Логин
  loginUser: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post("/api/auth/login", data);

      const token = res.data.token;
      get().setToken(token);

      set({ user: res.data.user, loading: false });
      return true;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Error" });
      return false;
    }
  },

  // Получение текущего пользователя
  fetchMe: async () => {
    const token = get().token;
    if (!token) return;

    try {
      set({ loading: true });
      const res = await axios.get("/api/auth/me");
      set({ user: res.data, loading: false });
    } catch (err) {
      console.error(err);
      get().setToken("");
      set({ user: null, loading: false });
    }
  },

  // Выход
  logout: () => {
    get().setToken("");
    set({ user: null });
  },
}));
