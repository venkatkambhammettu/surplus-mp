import '@servicenow/sdk/global';
import { Table, StringColumn, DateTimeColumn, BooleanColumn, ReferenceColumn, DecimalColumn, IntegerColumn, ChoiceColumn } from '@servicenow/sdk/core';

// Surplus Request table extending the Case table
// This table manages requests for surplus asset disposition
export const x_863538_surp_mp_surplus_request = Table({
  name: 'x_863538_surp_mp_surplus_request',
  label: 'Surplus Request',
  extends: 'sn_customerservice_case', // Extends the Customer Service Case table for workflow capabilities
  display: 'number',
  accessible_from: 'public',
  caller_access: 'tracking',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  audit: true,
  extensible: true,
  
  auto_number: {
    prefix: 'SREQ',
    number: 1000,
    number_of_digits: 7,
  },

  schema: {
    // Core request information
    request_type: ChoiceColumn({
      label: 'Request Type',
      mandatory: true,
      dropdown: 'dropdown_without_none',
      default: 'disposition',
      choices: {
        disposition: { label: 'Asset Disposition', sequence: 0 },
        bulk_disposition: { label: 'Bulk Asset Disposition', sequence: 1 },
        internal_transfer: { label: 'Internal Transfer Request', sequence: 2 },
        auction_setup: { label: 'Auction Setup', sequence: 3 }
      }
    }),

    request_status: ChoiceColumn({
      label: 'Request Status',
      mandatory: true,
      default: 'draft',
      dropdown: 'dropdown_without_none',
      choices: {
        draft: { label: 'Draft', sequence: 0 },
        submitted: { label: 'Submitted', sequence: 1 },
        under_review: { label: 'Under Review', sequence: 2 },
        approved: { label: 'Approved', sequence: 3 },
        in_progress: { label: 'In Progress', sequence: 4 },
        completed: { label: 'Completed', sequence: 5 },
        cancelled: { label: 'Cancelled', sequence: 6 },
        rejected: { label: 'Rejected', sequence: 7 }
      }
    }),

    disposition_method: ChoiceColumn({
      label: 'Disposition Method',
      dropdown: 'dropdown_with_none',
      choices: {
        sell: { label: 'Sell', sequence: 0 },
        auction: { label: 'Auction', sequence: 1 },
        redeploy: { label: 'Internal Redeployment', sequence: 2 },
        donate: { label: 'Donate', sequence: 3 },
        recycle: { label: 'Recycle', sequence: 4 },
        dispose: { label: 'Dispose', sequence: 5 }
      }
    }),

    // Request ownership and contacts
    requestor: ReferenceColumn({
      label: 'Requestor',
      referenceTable: 'sys_user',
      mandatory: true
    }),

    requestor_department: ReferenceColumn({
      label: 'Requestor Department',
      referenceTable: 'cmn_department'
    }),

    business_justification: StringColumn({
      label: 'Business Justification',
      maxLength: 4000,
      mandatory: true
    }),

    assigned_to: ReferenceColumn({
      label: 'Assigned To',
      referenceTable: 'sys_user'
    }),

    assignment_group: ReferenceColumn({
      label: 'Assignment Group',
      referenceTable: 'sys_user_group'
    }),

    // Timeline and dates
    requested_completion_date: DateTimeColumn({
      label: 'Requested Completion Date'
    }),

    target_completion_date: DateTimeColumn({
      label: 'Target Completion Date'
    }),

    actual_completion_date: DateTimeColumn({
      label: 'Actual Completion Date'
    }),

    // Asset counts and totals
    total_assets: IntegerColumn({
      label: 'Total Assets',
      default: '0',
      read_only: true
    }),

    estimated_total_value: DecimalColumn({
      label: 'Estimated Total Value (USD)',
      default: '0.00',
      read_only: true
    }),

    actual_total_value: DecimalColumn({
      label: 'Actual Total Value (USD)',
      default: '0.00'
    }),

    total_disposal_cost: DecimalColumn({
      label: 'Total Disposal Cost (USD)',
      default: '0.00'
    }),

    net_recovery_value: DecimalColumn({
      label: 'Net Recovery Value (USD)',
      default: '0.00',
      read_only: true
    }),

    // Approval workflow
    requires_approval: BooleanColumn({
      label: 'Requires Approval',
      default: 'true'
    }),

    approval_level: ChoiceColumn({
      label: 'Approval Level Required',
      dropdown: 'dropdown_with_none',
      choices: {
        manager: { label: 'Manager Approval', sequence: 0 },
        director: { label: 'Director Approval', sequence: 1 },
        finance: { label: 'Finance Approval', sequence: 2 },
        legal: { label: 'Legal Approval', sequence: 3 },
        executive: { label: 'Executive Approval', sequence: 4 }
      }
    }),

    approved_by: ReferenceColumn({
      label: 'Approved By',
      referenceTable: 'sys_user'
    }),

    approved_date: DateTimeColumn({
      label: 'Approved Date'
    }),

    approval_notes: StringColumn({
      label: 'Approval Notes',
      maxLength: 1000
    }),

    // Compliance and documentation
    compliance_review_required: BooleanColumn({
      label: 'Compliance Review Required',
      default: 'false'
    }),

    compliance_reviewed_by: ReferenceColumn({
      label: 'Compliance Reviewed By',
      referenceTable: 'sys_user'
    }),

    compliance_review_date: DateTimeColumn({
      label: 'Compliance Review Date'
    }),

    environmental_review_required: BooleanColumn({
      label: 'Environmental Review Required',
      default: 'false'
    }),

    data_security_review_required: BooleanColumn({
      label: 'Data Security Review Required',
      default: 'false'
    }),

    // Location and logistics
    pickup_location: StringColumn({
      label: 'Pickup Location',
      maxLength: 255
    }),

    delivery_instructions: StringColumn({
      label: 'Delivery Instructions',
      maxLength: 1000
    }),

    // Project and tracking
    project_code: StringColumn({
      label: 'Project Code',
      maxLength: 50
    }),

    cost_center: StringColumn({
      label: 'Cost Center',
      maxLength: 50
    }),

    // Performance metrics
    processing_days: IntegerColumn({
      label: 'Processing Days',
      read_only: true
    }),

    // Additional notes and attachments
    special_instructions: StringColumn({
      label: 'Special Instructions',
      maxLength: 4000
    }),

    internal_notes: StringColumn({
      label: 'Internal Notes',
      maxLength: 4000
    }),

    // Integration and external references
    external_request_id: StringColumn({
      label: 'External Request ID',
      maxLength: 100
    }),

    vendor_quote_reference: StringColumn({
      label: 'Vendor Quote Reference',
      maxLength: 100
    }),

    // Audit trail
    submitted_date: DateTimeColumn({
      label: 'Submitted Date'
    }),

    last_status_update: DateTimeColumn({
      label: 'Last Status Update',
      default: 'javascript:gs.nowDateTime();'
    }),

    status_update_reason: StringColumn({
      label: 'Status Update Reason',
      maxLength: 255
    })
  }
});