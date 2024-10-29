const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://slateblue-hummingbird-423694.hostingersite.com'
  : 'http://localhost:3001';

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

