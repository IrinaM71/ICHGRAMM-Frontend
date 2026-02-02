import api from "./axios";

export const getAllPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export const toggleLike = async (id) => {
  const res = await api.post(`/posts/${id}/like`);
  return res.data;
};

export const addComment = async (id, text) => {
  const res = await api.post(`/posts/${id}/comment`, { text });
  return res.data;
};
