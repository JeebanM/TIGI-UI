import API from "./apiService";

export const telegramLogin = (initDataRaw: string) => {
  console.log("initDataRaw SENT TO BACKEND:", initDataRaw);
  return API.post("/auth/login", { initData: initDataRaw });
};