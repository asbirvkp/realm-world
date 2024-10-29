import axios from 'axios';

const API_URL = 'https://server-rbpl.onrender.com';

const CACHE_DURATION = 30000; // 30 seconds cache
let cache = {
  performanceData: { data: null, timestamp: null },
  tradeHistory: { data: null, timestamp: null },
  pnlData: { data: null, timestamp: null }
};

const isCacheValid = (cacheKey) => {
  return cache[cacheKey].data && 
         cache[cacheKey].timestamp && 
         (Date.now() - cache[cacheKey].timestamp < CACHE_DURATION);
};

export const fetchPerformanceData = async () => {
  try {
    // Return cached data if valid
    if (isCacheValid('performanceData')) {
      return cache.performanceData.data;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/api/performance-data`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.data) {
      // Return cached data if request fails but cache exists
      if (cache.performanceData.data) {
        return cache.performanceData.data;
      }
      throw new Error('No data received from server');
    }

    // Update cache
    cache.performanceData = {
      data: response.data,
      timestamp: Date.now()
    };

    return response.data;
  } catch (error) {
    // Return cached data if request fails but cache exists
    if (cache.performanceData.data) {
      return cache.performanceData.data;
    }
    throw error;
  }
};

export const fetchTradeHistory = async () => {
  try {
    // Return cached data if valid
    if (isCacheValid('tradeHistory')) {
      return cache.tradeHistory.data;
    }

    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/trade-history`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Update cache
    cache.tradeHistory = {
      data: response.data,
      timestamp: Date.now()
    };

    return response.data;
  } catch (error) {
    console.error('Error fetching trade history:', error);
    throw error;
  }
};

export const fetchPNLData = async (sheetName) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/pnl-data?sheet=${sheetName}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching PNL data:', error);
    throw error;
  }
};
