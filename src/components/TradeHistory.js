import React, { useState, useEffect } from 'react';
import goldCoinIcon from '../assets/icons/gold-coin.png';
import './TradeHistory.css';
import { fetchTradeHistory } from '../services/googleSheetsService';

function TradeHistory({ isDashboard }) {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTradeHistory();
        setTradeHistory(data);
        setError(null);
        setIsLoading(false);
      } catch (e) {
        console.error("Error loading trade history:", e);
        setError('Failed to load trade history');
        setIsLoading(false);
      }
    };

    loadData();
    const intervalId = setInterval(loadData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatPNL = (pnl) => {
    if (!pnl || isNaN(parseFloat(pnl))) return "-";
    const value = parseFloat(pnl);
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return <div className="trade-history">Loading...</div>;
  }

  if (error) {
    return <div className="trade-history">Error: {error}</div>;
  }

  const displayedHistory = isDashboard ? tradeHistory.slice(0, 6) : tradeHistory;

  return (
    <div className="trade-history">
      <table className="trade-history-table">
        <tbody>
          {displayedHistory.map((trade, index) => (
            <tr key={index}>
              <td className="date-column">{formatDate(trade.date)}</td>
              <td className="name-column">
                <div className="currency-info">
                  <img src={goldCoinIcon} alt="Gold Coin" className="currency-icon" />
                  <span className="currency-name">GOLD</span>
                  <span className={`trade-type ${trade.tradeType.toLowerCase()}`}>
                    {trade.tradeType}
                  </span>
                </div>
              </td>
              <td className={`pnl-column ${parseFloat(trade.pnl) >= 0 ? 'positive' : 'negative'}`}>
                {formatPNL(trade.pnl)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeHistory;
