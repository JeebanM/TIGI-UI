export const getTodayKey = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // e.g., '2024-06-22'
};
