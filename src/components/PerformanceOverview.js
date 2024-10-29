import React, { useState, useEffect } from 'react';
import { fetchPerformanceData } from '../services/googleSheetsService';
import '../styles/PerformanceOverview.css';

function PerformanceOverview() {
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPerformanceData();
        if (data && Array.isArray(data) && data.length > 0) {
          setPerformanceData(data);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setError(error.message || 'Failed to load performance data');
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Refresh every 30 seconds instead of 5 seconds
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading && performanceData.length === 0) {
    return <div className="loading-spinner">Loading performance data...</div>;
  }

  if (error && performanceData.length === 0) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="performance-overview">
      <div className="performance-cards-grid">
        {performanceData.map((data, index) => (
          <div key={index} className="dashboard-performance-card">
            <div className="card-header">
              <h3 className="card-title">{data.title}</h3>
              <div className="history-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="subtitle">{data.change}</p>
            <div className="value-container">
              <span className={`value ${parseFloat(data.value) >= 0 ? 'positive' : 'negative'}`}>
                {parseFloat(data.value) >= 0 ? '+' : ''}{data.value}%
              </span>
              <span className="profit-label">Profit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceOverview;
