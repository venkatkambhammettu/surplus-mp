export class SurplusRequestService {
  constructor() {
    this.tableName = "x_863538_surp_mp_surplus_request";
  }

  // Create a new surplus request
  async createRequest(requestData) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create request');
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('Error creating surplus request:', error);
      throw error;
    }
  }

  // Get all requests for the current user
  async getUserRequests() {
    try {
      const searchParams = new URLSearchParams({
        'sysparm_query': `requestor=${window.g_user.sys_id}`,
        'sysparm_display_value': 'all',
        'sysparm_limit': '50',
        'sysparm_order_by': '^ORDERBYDESCsubmitted_date'
      });

      const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch requests');
      }

      const result = await response.json();
      return result.result || [];
    } catch (error) {
      console.error('Error fetching user requests:', error);
      throw error;
    }
  }

  // Get a specific request by sys_id
  async getRequest(sysId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?sysparm_display_value=all`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch request');
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('Error fetching request:', error);
      throw error;
    }
  }

  // Update a request (for future use)
  async updateRequest(sysId, updateData) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to update request');
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('Error updating request:', error);
      throw error;
    }
  }
}