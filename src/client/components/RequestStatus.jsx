import React, { useState, useEffect } from 'react';
import { SurplusRequestService } from '../services/SurplusRequestService.js';
import './RequestStatus.css';

export default function RequestStatus() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const service = new SurplusRequestService();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const userRequests = await service.getUserRequests();
      setRequests(userRequests);
    } catch (err) {
      setError('Failed to load your requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      'draft': 'status-draft',
      'submitted': 'status-submitted',
      'under_review': 'status-review',
      'approved': 'status-approved',
      'in_progress': 'status-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled',
      'rejected': 'status-rejected'
    };
    return statusClasses[status] || 'status-default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    // Handle ServiceNow field objects
    const dateValue = typeof dateString === 'object' ? dateString.display_value : dateString;
    
    try {
      return new Date(dateValue).toLocaleDateString();
    } catch {
      return dateValue || 'N/A';
    }
  };

  const extractValue = (field) => {
    return typeof field === 'object' ? field.display_value : field;
  };

  if (loading) {
    return <div className="loading">Loading your requests...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="no-requests">
        <p>You haven't submitted any surplus requests yet.</p>
        <p>Use the "Submit New Request" tab to create your first request.</p>
      </div>
    );
  }

  return (
    <div className="request-status">
      <div className="requests-grid">
        {requests.map(request => {
          const requestNumber = extractValue(request.number);
          const requestStatus = extractValue(request.request_status);
          const requestType = extractValue(request.request_type);
          const submittedDate = formatDate(request.submitted_date);
          const businessJustification = extractValue(request.business_justification);
          const dispositionMethod = extractValue(request.disposition_method);
          const sysId = typeof request.sys_id === 'object' ? request.sys_id.value : request.sys_id;
          
          return (
            <div key={sysId} className="request-card">
              <div className="request-header">
                <h3>{requestNumber}</h3>
                <span className={`status-badge ${getStatusBadgeClass(requestStatus)}`}>
                  {requestStatus?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
              
              <div className="request-details">
                <div className="detail-row">
                  <span className="label">Type:</span>
                  <span>{requestType?.replace('_', ' ') || 'N/A'}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Submitted:</span>
                  <span>{submittedDate}</span>
                </div>
                
                {dispositionMethod && (
                  <div className="detail-row">
                    <span className="label">Method:</span>
                    <span>{dispositionMethod.replace('_', ' ')}</span>
                  </div>
                )}
                
                <div className="detail-row">
                  <span className="label">Justification:</span>
                  <span className="justification">
                    {businessJustification ? 
                      (businessJustification.length > 100 ? 
                        businessJustification.substring(0, 100) + '...' : 
                        businessJustification) : 
                      'N/A'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}