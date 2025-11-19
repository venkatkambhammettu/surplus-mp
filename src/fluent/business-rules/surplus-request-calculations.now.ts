import '@servicenow/sdk/global';
import { BusinessRule } from '@servicenow/sdk/core';
import { calculateRequestAssetTotals, calculateDaysToDisposition, updateSurplusRequestTotals } from '../../server/surplus-calculations.js';

// Business rule to calculate totals for surplus request assets
export const calculateSurplusRequestAssetTotals = BusinessRule({
  $id: Now.ID['calculate_request_asset_totals'],
  name: 'Calculate Surplus Request Asset Totals',
  table: 'x_863538_surp_mp_surplus_request_asset',
  when: 'before',
  action: ['insert', 'update'],
  script: calculateRequestAssetTotals,
  order: 50,
  active: true,
  condition: "current.quantity.changes() || current.unit_estimated_value.changes() || current.unit_actual_value.changes()",
  description: 'Calculates total estimated and actual values based on quantity and unit values'
});

// Business rule to calculate days to disposition
export const calculateDispositionDays = BusinessRule({
  $id: Now.ID['calculate_disposition_days'],
  name: 'Calculate Days to Disposition',
  table: 'x_863538_surp_mp_surplus_request_asset',
  when: 'before',
  action: ['update'],
  script: calculateDaysToDisposition,
  order: 60,
  active: true,
  condition: "current.actual_disposition_date.changes()",
  description: 'Calculates the number of days from request addition to actual disposition'
});

// Business rule to update surplus request totals
export const updateRequestTotals = BusinessRule({
  $id: Now.ID['update_request_totals'],
  name: 'Update Surplus Request Totals',
  table: 'x_863538_surp_mp_surplus_request_asset',
  when: 'after',
  action: ['insert', 'update', 'delete'],
  script: updateSurplusRequestTotals,
  order: 100,
  active: true,
  description: 'Updates the total asset count and values on the parent surplus request record'
});