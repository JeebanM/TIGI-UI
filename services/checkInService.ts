import API from './apiService';

export interface CheckInResponse {
  streak: number;
  reward: number;
}

export const checkIn = async (): Promise<CheckInResponse> => {
  const res = await API.post<CheckInResponse>('/checkin');
  return res.data;
};