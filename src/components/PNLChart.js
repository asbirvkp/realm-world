import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { fetchPNLData } from '../services/googleSheetsService';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin

// Register the necessary components and the data labels plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the data labels plugin
);

function PNLChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('October'); // Default month
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [selectedMonth]); // Fetch data when selectedMonth changes

  const fetchData = async () => {
    try {
      const data = await fetchPNLData(selectedMonth === 'September' ? 'Sep-PNL' : 'Oct-PNL');
      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setChartData({
        labels: sortedData.map(item => String(new Date(item.date).getDate()).padStart(2, '0')),
        datasets: [
          {
            label: 'Daily PNL',
            data: sortedData.map(item => item.pnl),
            backgroundColor: sortedData.map(item => item.pnl >= 0 ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)'),
            borderColor: sortedData.map(item => item.pnl >= 0 ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)'),
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load chart data. Please try again later.');
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value); // Update selected month
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'PNL % Movement Over Time',
        color: 'white',
        font: {
          size: '16px',
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          font: {
            size: '10px',
          },
          maxRotation: 0, // Prevent rotation of tick labels
          minRotation: 0, // Prevent rotation of tick labels
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return value + '%'; // Append '%' to the Y-axis ticks
          },
          font: {
            size: '10px',
          },
        },
      }
    },
    layout: {
      padding: {
        top: 30,
        right: 20,
        bottom: 25,
        left: 20
      }
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '70vh', 
      padding: '20px', 
      paddingTop: '90px',
      boxSizing: 'border-box',
      overflow: 'hidden' // Prevent scrolling
    }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <select value={selectedMonth} onChange={handleMonthChange} style={{ padding: '5px', borderRadius: '5px' }}>
          <option value="September">September</option>
          <option value="October">October</option>
        </select>
      </div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : chartData ? (
        <Bar ref={chartRef} data={chartData} options={options} />
      ) : (
        <p style={{ color: 'white' }}>Loading chart data...</p>
      )}
    </div>
  );
}

export default PNLChart;
