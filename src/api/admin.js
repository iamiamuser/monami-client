// src/api/admin.js
import axiosInstance from './axiosInstance';

export const fetchDashboardSummary = async () => {
  const response = await axiosInstance.get('/admin/dashboard-summary', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
