import { create } from "zustand";
import axios from "axios";

export const useMessagesStore = create((set, get) => ({
  chats: [], // список чатов слева
  messages: [], // сообщения текущего чата
  typing: false, // собеседник печатает
  onlineUsers: {}, // { userId: true/false }

  // Загрузить список чатов
  fetchChats: async () => {
    try {
      const res = await axios.get("/api/messages/chats");
      set({ chats: res.data });
    } catch (err) {
      console.error("Error loading chats:", err);
    }
  },

  // Загрузить сообщения с конкретным пользователем
  fetchMessages: async (companionId) => {
    try {
      const res = await axios.get(`/api/messages/${companionId}`);
      set({ messages: res.data });
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  },

  // Добавить новое сообщение в текущий чат
  addMessage: (msg) => {
    set({ messages: [...get().messages, msg] });
  },

  // Установить статус "печатает"
  setTyping: (value) => set({ typing: value }),

  // Установить онлайн‑статус пользователя
  setOnline: (userId, isOnline) =>
    set((state) => ({
      onlineUsers: { ...state.onlineUsers, [userId]: isOnline },
    })),
}));
