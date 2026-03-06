import API from "./axiosInstance";

export const getCourses = (program, semester) => {

  const params = new URLSearchParams();

  if (program) params.append("program", program);
  if (semester) params.append("semester", semester);

  return API.get(`/courses?${params.toString()}`);
};

export const getRecentCourses = () =>
  API.get("/worksheets/recent-courses");