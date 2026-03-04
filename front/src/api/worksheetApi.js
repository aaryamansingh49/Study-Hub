import API from "./axiosInstance";

export const getWorksheetGroups = (courseId) =>
  API.get(`/worksheets/groups/${courseId}`);

export const getWorksheetGroupDetails = (courseId, number) =>
  API.get(`/worksheets/group/${courseId}/${number}`);

export const downloadWorksheet = (id) =>
  API.put(`/worksheets/${id}/download`);