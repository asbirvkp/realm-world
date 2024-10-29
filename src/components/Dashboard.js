import React from 'react';
import DailyPNL from './DailyPNL';
import PerformanceOverview from './PerformanceOverview';
import TradeHistory from './TradeHistory';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <DailyPNL />
      <PerformanceOverview />
      <TradeHistory isDashboard={true} />
    </div>
  );
}

export default Dashboard;
