import API from "./apiService";

export const claimReferral = (code: string) =>
  API.post("/referral/claim", { code });
