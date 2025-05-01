const API_BASE_URL = 'http://localhost:5000/api';

export const fetchDoctors = async (page = 1, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    ...filters
  });

  const response = await fetch(`${API_BASE_URL}/list-doctor-with-filter?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return response.json();
};

export const addDoctor = async (doctorData: any) => {
  const response = await fetch(`${API_BASE_URL}/add-doctor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doctorData),
  });
  if (!response.ok) throw new Error('Failed to add doctor');
  return response.json();
};