import '@servicenow/sdk/global';
import { BusinessRule } from '@servicenow/sdk/core';
import { updateSurplusAssetStatus } from '../../server/surplus-asset-status-update.js';

// Business rule to automatically update surplus asset lifecycle status 
// when assets are added to or removed from surplus requests
export const surplusAssetStatusUpdate = BusinessRule({
  $id: Now.ID['surplus_asset_status_update'],
  name: 'Update Surplus Asset Status',
  table: 'x_863538_surp_mp_surplus_request_asset',
  when: 'after',
  action: ['insert', 'update'],
  script: updateSurplusAssetStatus,
  order: 100,
  active: true,
  description: 'Automatically updates the surplus asset status when the asset is added to or modified in a surplus request'
});