const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://server-rbpl.onrender.com'
  : 'http://localhost:3001';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const fetchData = async (endpoint) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

