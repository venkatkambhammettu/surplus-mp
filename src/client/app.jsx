import React, { useState } from 'react';
import SurplusRequestForm from './components/SurplusRequestForm.jsx';
import RequestStatus from './components/RequestStatus.jsx';
import './app.css';

export default function SurplusMarketplacePortal() {
  const [activeTab, setActiveTab] = useState('request');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRequestSubmitted = () => {
    // Trigger a refresh of the status component and switch to status tab
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('status');
  };

  return (
    <div className="surplus-portal">
      <header className="portal-header">
        <h1>Surplus Marketplace Portal</h1>
        <p>Submit requests for surplus asset disposition and track your submissions</p>
      </header>

      <nav className="portal-nav">
        <button 
          className={`nav-button ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Submit New Request
        </button>
        <button 
          className={`nav-button ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          My Requests
        </button>
      </nav>

      <main className="portal-content">
        {activeTab === 'request' && (
          <div className="tab-content">
            <h2>Submit Surplus Request</h2>
            <p>Use this form to request disposition of surplus assets from your department.</p>
            <SurplusRequestForm onSubmitted={handleRequestSubmitted} />
          </div>
        )}

        {activeTab === 'status' && (
          <div className="tab-content">
            <h2>My Surplus Requests</h2>
            <p>View and track the status of your submitted surplus requests.</p>
            <RequestStatus key={refreshTrigger} />
          </div>
        )}
      </main>
    </div>
  );
}