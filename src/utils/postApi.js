import { api } from "./api.js";

export const postApi = {
  getFeed: () => api.get("/post/feed"),
  create: (data) => api.post("/posts", data),
  like: (id) => api.post(`/post/${id}/like`),
};
