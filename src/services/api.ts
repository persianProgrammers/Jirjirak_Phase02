const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  getHealth: async () => {
    const res = await fetch(`${API_URL}/health`);
    if (!res.ok) throw new Error('API Error');
    return res.json();
  }
};
