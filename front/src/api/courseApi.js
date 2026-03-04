import API from "./axiosInstance";

export const getCourses = (program, semester) =>
  API.get(`/courses?program=${program}&semester=${semester}`);

export const getRecentCourses = () =>
  API.get("/worksheets/recent-courses");