import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchPNLData } from '../services/googleSheetsService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/PNLChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DailyPNL() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchTradeData = async () => {
    try {
      const pnlData = await fetchPNLData('Trade-History');
      const validData = pnlData
        .map(item => ({
          ...item,
          pnl: parseFloat(item.pnl),
          date: new Date(item.date)
        }))
        .filter(item => !isNaN(item.pnl) && item.date);

      // Get the last row of data
      const lastRowIndex = validData.length - 1;

      // Get the last 31 rows, ensuring we don't go out of bounds
      const startIndex = Math.max(0, lastRowIndex - 30); // Start from the last row and go back 30 rows
      const recentTrades = validData.slice(startIndex, lastRowIndex + 1); // Slice the last 31 rows

      const labels = recentTrades.map(item => {
        return item.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
      });
      const data = recentTrades.map(item => item.pnl);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Daily PNL',
            data: data,
            backgroundColor: recentTrades.map(item => item.pnl >= 0 ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)'),
            borderColor: recentTrades.map(item => item.pnl >= 0 ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)'),
            borderWidth: 1,
            barThickness: 5,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching PNL data:', error);
    }
  };

  useEffect(() => {
    fetchTradeData();
    const intervalId = setInterval(() => {
      fetchTradeData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        display: false, // Ensure this is set to false to disable data labels on the bars
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'grey',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'grey',
          callback: function(value) {
            return value + '%'; // Add percentage sign to Y-axis labels
          },
        },
        min: -40, // Set minimum value to -50%
        max: 30,  // Set maximum value to 50%
      },
    },
  };

  return (
    <div className="daily-pnl-chart-container" style={{ 
      height: '400px',
      marginTop: '-15px', // Add this line to move the chart down
    }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default DailyPNL;
