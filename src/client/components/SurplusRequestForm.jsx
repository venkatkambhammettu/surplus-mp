import React, { useState } from 'react';
import { SurplusRequestService } from '../services/SurplusRequestService.js';
import './SurplusRequestForm.css';

export default function SurplusRequestForm({ onSubmitted }) {
  const [formData, setFormData] = useState({
    request_type: 'disposition',
    disposition_method: '',
    business_justification: '',
    requested_completion_date: '',
    pickup_location: '',
    special_instructions: '',
    project_code: '',
    cost_center: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const service = new SurplusRequestService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Format the date for ServiceNow
      const submissionData = {
        ...formData,
        request_status: 'draft',
        requestor: window.g_user.sys_id, // Current user
        submitted_date: new Date().toISOString(),
        last_status_update: new Date().toISOString()
      };

      await service.createRequest(submissionData);
      
      setMessage({ 
        type: 'success', 
        text: 'Your surplus request has been successfully submitted! You can track its progress in the "My Requests" tab.' 
      });
      
      // Reset form
      setFormData({
        request_type: 'disposition',
        disposition_method: '',
        business_justification: '',
        requested_completion_date: '',
        pickup_location: '',
        special_instructions: '',
        project_code: '',
        cost_center: ''
      });

      // Notify parent component
      if (onSubmitted) {
        onSubmitted();
      }
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'There was an error submitting your request. Please try again or contact support.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="surplus-request-form">
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Request Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="request_type">Request Type *</label>
              <select
                id="request_type"
                name="request_type"
                value={formData.request_type}
                onChange={handleChange}
                required
              >
                <option value="disposition">Asset Disposition</option>
                <option value="bulk_disposition">Bulk Asset Disposition</option>
                <option value="internal_transfer">Internal Transfer Request</option>
                <option value="auction_setup">Auction Setup</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="disposition_method">Preferred Disposition Method</label>
              <select
                id="disposition_method"
                name="disposition_method"
                value={formData.disposition_method}
                onChange={handleChange}
              >
                <option value="">-- Select Method --</option>
                <option value="sell">Sell</option>
                <option value="auction">Auction</option>
                <option value="redeploy">Internal Redeployment</option>
                <option value="donate">Donate</option>
                <option value="recycle">Recycle</option>
                <option value="dispose">Dispose</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="business_justification">Business Justification *</label>
            <textarea
              id="business_justification"
              name="business_justification"
              value={formData.business_justification}
              onChange={handleChange}
              placeholder="Please explain why these assets are being marked as surplus and how this aligns with business needs..."
              rows="4"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Timeline & Location</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="requested_completion_date">Requested Completion Date</label>
              <input
                type="date"
                id="requested_completion_date"
                name="requested_completion_date"
                value={formData.requested_completion_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pickup_location">Pickup Location</label>
              <input
                type="text"
                id="pickup_location"
                name="pickup_location"
                value={formData.pickup_location}
                onChange={handleChange}
                placeholder="Building, floor, room number"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="project_code">Project Code</label>
              <input
                type="text"
                id="project_code"
                name="project_code"
                value={formData.project_code}
                onChange={handleChange}
                placeholder="Optional project code"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cost_center">Cost Center</label>
              <input
                type="text"
                id="cost_center"
                name="cost_center"
                value={formData.cost_center}
                onChange={handleChange}
                placeholder="Optional cost center"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="special_instructions">Special Instructions</label>
            <textarea
              id="special_instructions"
              name="special_instructions"
              value={formData.special_instructions}
              onChange={handleChange}
              placeholder="Any special handling requirements, access restrictions, or other important notes..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}