import '@servicenow/sdk/global';
import { Table, StringColumn, DateTimeColumn, BooleanColumn, ReferenceColumn, DecimalColumn, IntegerColumn, ChoiceColumn } from '@servicenow/sdk/core';

// Surplus Asset table extending the Asset table
// This table tracks all assets identified as surplus and ready for disposition
export const x_863538_surp_mp_surplus_asset = Table({
  name: 'x_863538_surp_mp_surplus_asset',
  label: 'Surplus Asset',
  extends: 'alm_asset', // Extends the Asset Management asset table
  display: 'display_name',
  accessible_from: 'public',
  caller_access: 'tracking',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  audit: true,
  extensible: true,
  
  auto_number: {
    prefix: 'SRP',
    number: 1000,
    number_of_digits: 7,
  },

  schema: {
    // Core surplus-specific fields
    surplus_reason: ChoiceColumn({
      label: 'Surplus Reason',
      mandatory: true,
      dropdown: 'dropdown_with_none',
      choices: {
        end_of_life: { label: 'End of Life', sequence: 0 },
        technology_upgrade: { label: 'Technology Upgrade', sequence: 1 },
        redundant: { label: 'Redundant/Duplicate', sequence: 2 },
        underutilized: { label: 'Underutilized', sequence: 3 },
        damaged: { label: 'Damaged/Non-functional', sequence: 4 },
        lease_expiration: { label: 'Lease Expiration', sequence: 5 },
        downsizing: { label: 'Department Downsizing', sequence: 6 },
        other: { label: 'Other', sequence: 7 }
      }
    }),

    surplus_status: ChoiceColumn({
      label: 'Surplus Status',
      mandatory: true,
      default: 'identified',
      dropdown: 'dropdown_without_none',
      choices: {
        identified: { label: 'Identified', sequence: 0 },
        pending_approval: { label: 'Pending Approval', sequence: 1 },
        approved: { label: 'Approved for Disposition', sequence: 2 },
        in_disposition: { label: 'In Disposition Process', sequence: 3 },
        disposed: { label: 'Disposed', sequence: 4 },
        cancelled: { label: 'Cancelled', sequence: 5 }
      }
    }),

    disposition_priority: ChoiceColumn({
      label: 'Disposition Priority',
      dropdown: 'dropdown_with_none',
      choices: {
        low: { label: 'Low', sequence: 0 },
        medium: { label: 'Medium', sequence: 1 },
        high: { label: 'High', sequence: 2 },
        urgent: { label: 'Urgent', sequence: 3 }
      }
    }),

    // Identification and tracking
    surplus_number: StringColumn({ 
      label: 'Surplus Number',
      maxLength: 40,
      default: 'javascript:global.getNextObjNumberPadded();'
    }),

    identified_by: ReferenceColumn({
      label: 'Identified By',
      referenceTable: 'sys_user',
      mandatory: true
    }),

    identified_date: DateTimeColumn({
      label: 'Identified Date',
      mandatory: true,
      default: 'javascript:gs.nowDateTime();'
    }),

    approved_by: ReferenceColumn({
      label: 'Approved By',
      referenceTable: 'sys_user'
    }),

    approved_date: DateTimeColumn({
      label: 'Approved Date'
    }),

    // Asset condition and valuation
    condition_assessment: ChoiceColumn({
      label: 'Condition Assessment',
      dropdown: 'dropdown_with_none',
      choices: {
        excellent: { label: 'Excellent', sequence: 0 },
        good: { label: 'Good', sequence: 1 },
        fair: { label: 'Fair', sequence: 2 },
        poor: { label: 'Poor', sequence: 3 },
        non_functional: { label: 'Non-Functional', sequence: 4 }
      }
    }),

    estimated_value: DecimalColumn({
      label: 'Estimated Value (USD)',
      default: '0.00'
    }),

    market_value: DecimalColumn({
      label: 'Market Value (USD)',
      default: '0.00'
    }),

    disposal_cost: DecimalColumn({
      label: 'Estimated Disposal Cost (USD)',
      default: '0.00'
    }),

    // Location and storage
    current_location: StringColumn({
      label: 'Current Storage Location',
      maxLength: 255
    }),

    // Compliance and security
    data_sanitization_required: BooleanColumn({
      label: 'Data Sanitization Required',
      default: 'false'
    }),

    data_sanitization_complete: BooleanColumn({
      label: 'Data Sanitization Complete',
      default: 'false'
    }),

    data_sanitization_date: DateTimeColumn({
      label: 'Data Sanitization Date'
    }),

    data_sanitization_method: StringColumn({
      label: 'Data Sanitization Method',
      maxLength: 255
    }),

    environmental_considerations: StringColumn({
      label: 'Environmental Considerations',
      maxLength: 1000
    }),

    // Disposition preferences and restrictions
    preferred_disposition: ChoiceColumn({
      label: 'Preferred Disposition Method',
      dropdown: 'dropdown_with_none',
      choices: {
        sell: { label: 'Sell', sequence: 0 },
        redeploy: { label: 'Internal Redeployment', sequence: 1 },
        donate: { label: 'Donate', sequence: 2 },
        recycle: { label: 'Recycle', sequence: 3 },
        dispose: { label: 'Dispose', sequence: 4 }
      }
    }),

    disposition_restrictions: StringColumn({
      label: 'Disposition Restrictions',
      maxLength: 1000
    }),

    // Tracking and notes
    surplus_notes: StringColumn({
      label: 'Surplus Notes',
      maxLength: 4000
    }),

    last_inventory_date: DateTimeColumn({
      label: 'Last Inventory Date'
    }),

    // Metrics for analytics
    days_in_surplus: IntegerColumn({
      label: 'Days in Surplus Status',
      read_only: true
    }),

    // Integration fields
    external_asset_id: StringColumn({
      label: 'External Asset ID',
      maxLength: 100
    }),

    erp_sync_status: ChoiceColumn({
      label: 'ERP Sync Status',
      dropdown: 'dropdown_with_none',
      choices: {
        pending: { label: 'Pending Sync', sequence: 0 },
        synced: { label: 'Synced', sequence: 1 },
        failed: { label: 'Sync Failed', sequence: 2 },
        not_required: { label: 'Not Required', sequence: 3 }
      }
    })
  }
});