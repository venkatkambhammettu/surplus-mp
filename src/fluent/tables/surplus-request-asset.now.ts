import '@servicenow/sdk/global';
import { Table, StringColumn, DateTimeColumn, BooleanColumn, ReferenceColumn, DecimalColumn, IntegerColumn, ChoiceColumn } from '@servicenow/sdk/core';

// Surplus Request Asset table - Many-to-many relationship between surplus requests and surplus assets
// This table manages the association between disposition requests and the assets being disposed
export const x_863538_surp_mp_surplus_request_asset = Table({
  name: 'x_863538_surp_mp_surplus_request_asset',
  label: 'Surplus Request Asset',
  display: 'display_name',
  accessible_from: 'public',
  caller_access: 'tracking',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  audit: true,
  
  auto_number: {
    prefix: 'SRA',
    number: 1000,
    number_of_digits: 7,
  },

  schema: {
    // Core relationship fields
    surplus_request: ReferenceColumn({
      label: 'Surplus Request',
      referenceTable: 'x_863538_surp_mp_surplus_request',
      mandatory: true
    }),

    surplus_asset: ReferenceColumn({
      label: 'Surplus Asset',
      referenceTable: 'x_863538_surp_mp_surplus_asset',
      mandatory: true
    }),

    // Asset-specific request details
    asset_status_in_request: ChoiceColumn({
      label: 'Asset Status in Request',
      mandatory: true,
      default: 'pending',
      dropdown: 'dropdown_without_none',
      choices: {
        pending: { label: 'Pending', sequence: 0 },
        approved: { label: 'Approved', sequence: 1 },
        in_disposition: { label: 'In Disposition', sequence: 2 },
        completed: { label: 'Completed', sequence: 3 },
        cancelled: { label: 'Cancelled', sequence: 4 },
        on_hold: { label: 'On Hold', sequence: 5 }
      }
    }),

    // Quantity and valuation (for assets that may have multiple units)
    quantity: IntegerColumn({
      label: 'Quantity',
      mandatory: true,
      default: '1',
      min: 1
    }),

    unit_estimated_value: DecimalColumn({
      label: 'Unit Estimated Value (USD)',
      default: '0.00'
    }),

    total_estimated_value: DecimalColumn({
      label: 'Total Estimated Value (USD)',
      default: '0.00',
      read_only: true
    }),

    unit_actual_value: DecimalColumn({
      label: 'Unit Actual Value (USD)',
      default: '0.00'
    }),

    total_actual_value: DecimalColumn({
      label: 'Total Actual Value (USD)',
      default: '0.00',
      read_only: true
    }),

    // Disposition method override (can be different from request default)
    asset_disposition_method: ChoiceColumn({
      label: 'Asset Disposition Method',
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

    // Priority within the request
    priority: ChoiceColumn({
      label: 'Priority',
      dropdown: 'dropdown_with_none',
      choices: {
        low: { label: 'Low', sequence: 0 },
        medium: { label: 'Medium', sequence: 1 },
        high: { label: 'High', sequence: 2 },
        critical: { label: 'Critical', sequence: 3 }
      }
    }),

    // Timeline tracking
    added_to_request_date: DateTimeColumn({
      label: 'Added to Request Date',
      mandatory: true,
      default: 'javascript:new GlideDateTime().getDisplayValue();'
    }),

    added_by: ReferenceColumn({
      label: 'Added By',
      referenceTable: 'sys_user',
      mandatory: true
    }),

    target_disposition_date: DateTimeColumn({
      label: 'Target Disposition Date'
    }),

    actual_disposition_date: DateTimeColumn({
      label: 'Actual Disposition Date'
    }),

    // Asset condition at time of request
    condition_at_request: ChoiceColumn({
      label: 'Condition at Request',
      dropdown: 'dropdown_with_none',
      choices: {
        excellent: { label: 'Excellent', sequence: 0 },
        good: { label: 'Good', sequence: 1 },
        fair: { label: 'Fair', sequence: 2 },
        poor: { label: 'Poor', sequence: 3 },
        non_functional: { label: 'Non-Functional', sequence: 4 }
      }
    }),

    // Location and handling
    current_location: StringColumn({
      label: 'Current Location',
      maxLength: 255
    }),

    requires_special_handling: BooleanColumn({
      label: 'Requires Special Handling',
      default: 'false'
    }),

    special_handling_notes: StringColumn({
      label: 'Special Handling Notes',
      maxLength: 1000
    }),

    // Data security for this specific asset
    data_wiped: BooleanColumn({
      label: 'Data Wiped',
      default: 'false'
    }),

    data_wipe_date: DateTimeColumn({
      label: 'Data Wipe Date'
    }),

    data_wipe_method: StringColumn({
      label: 'Data Wipe Method',
      maxLength: 255
    }),

    data_wipe_verified_by: ReferenceColumn({
      label: 'Data Wipe Verified By',
      referenceTable: 'sys_user'
    }),

    // Disposition outcome tracking
    disposition_outcome: ChoiceColumn({
      label: 'Disposition Outcome',
      dropdown: 'dropdown_with_none',
      choices: {
        sold: { label: 'Sold', sequence: 0 },
        redeployed: { label: 'Redeployed Internally', sequence: 1 },
        donated: { label: 'Donated', sequence: 2 },
        recycled: { label: 'Recycled', sequence: 3 },
        disposed: { label: 'Disposed', sequence: 4 },
        returned_to_inventory: { label: 'Returned to Inventory', sequence: 5 }
      }
    }),

    recipient_organization: StringColumn({
      label: 'Recipient Organization',
      maxLength: 255
    }),

    sale_reference_number: StringColumn({
      label: 'Sale Reference Number',
      maxLength: 100
    }),

    // Asset-specific notes
    asset_notes: StringColumn({
      label: 'Asset Notes',
      maxLength: 1000
    }),

    disposal_certificate_number: StringColumn({
      label: 'Disposal Certificate Number',
      maxLength: 100
    }),

    // Compliance flags
    environmental_compliance_verified: BooleanColumn({
      label: 'Environmental Compliance Verified',
      default: 'false'
    }),

    regulatory_compliance_verified: BooleanColumn({
      label: 'Regulatory Compliance Verified',
      default: 'false'
    }),

    // Performance tracking
    days_to_disposition: IntegerColumn({
      label: 'Days to Disposition',
      read_only: true
    }),

    // Display name for the relationship record
    display_name: StringColumn({
      label: 'Display Name',
      maxLength: 255,
      read_only: true,
      function_definition: "glidefunction:concat(surplus_request.number, ' - ', surplus_asset.display_name)"
    }),

    // Integration fields
    external_tracking_id: StringColumn({
      label: 'External Tracking ID',
      maxLength: 100
    })
  },

  // Create indexes for better query performance
  index: [
    {
      name: 'idx_surplus_request_asset_request',
      element: 'surplus_request',
      unique: false
    },
    {
      name: 'idx_surplus_request_asset_asset',
      element: 'surplus_asset',
      unique: false
    }
  ]
});