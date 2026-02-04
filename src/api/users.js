import api from "/axios.js";

export const searchUsers = async (query) => {
  const res = await api.get(`/users/search?query=${query}`);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};

export const uploadAvatar = async (formData) => {
  const res = await api.post("/users/avatar", formData, {
    Headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
