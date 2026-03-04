import API from "./axiosInstance";

export const getSavedWorksheets = (email) =>
  API.get(`/saved/user/${email}`);

export const saveWorksheet = (data) =>
  API.post("/saved/save", data);

export const removeSavedWorksheet = (data) =>
  API.post("/saved/remove", data);