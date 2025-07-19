import API from "./apiService";

export interface TapResponse {
  newBalance: number;
}

/**
 * Call POST /game/tap on the backend.
 * @param tapCount number of taps to report (usually 1)
 */
export const tap = (tapCount: number = 1) => {
  return API.post<TapResponse>("/game/tap", { tapCount });
};