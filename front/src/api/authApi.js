import API from "./axiosInstance";

export const googleLogin = (userData) =>
  API.post("/users/google-login", userData);

export const adminLogin = (data) =>
  API.post("/admin/login", data);