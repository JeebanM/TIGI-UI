import API from './apiService';

export interface Task {
  id: number;
  platform: string;
  type: 'promos' | 'daily' | 'weekly' | 'monthly';
  url: string;
  reward: number;
  expires_at: string | null;
}

export const fetchTasks = (type: string) => API.get<Task[]>(`/tasks?type=${type}`);

export const completeTask = (taskId: number, proof: any = {}) =>
  API.post<{ reward: number }>(`/tasks/${taskId}/complete`, { proof });
