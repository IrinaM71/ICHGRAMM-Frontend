import { api } from "./api.js";

export const postApi = {
  getFeed: () => api.get("/posts/feed"),
  create: (data) => api.post("/posts", data),
  like: (id) => api.post(`/post/${id}/like`),
};
