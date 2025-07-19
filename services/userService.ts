import API from "./apiService";

export const getMe = () => API.get("/user/me");