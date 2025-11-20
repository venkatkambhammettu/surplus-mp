import '@servicenow/sdk/global';
import { List, Record } from '@servicenow/sdk/core';

// Create a custom view for the surplus asset list
export const surplus_asset_list_view = Record({
  $id: Now.ID['surplus_asset_list_view'],
  table: 'sys_ui_view',
  data: {
    name: 'surplus_asset_list',
    title: 'Surplus Asset List View'
  }
});

// List view for displaying surplus assets
export const surplus_asset_list = List({
  table: 'x_863538_surp_mp_surplus_asset',
  view: surplus_asset_list_view,
  columns: [
    { element: 'surplus_number', position: 0 },
    { element: 'display_name', position: 1 },
    { element: 'surplus_status', position: 2 },
    { element: 'surplus_reason', position: 3 },
    { element: 'condition_assessment', position: 4 },
    { element: 'estimated_value', position: 5 },
    { element: 'disposition_priority', position: 6 },
    { element: 'identified_by', position: 7 },
    { element: 'identified_date', position: 8 },
    { element: 'approved_by', position: 9 },
    { element: 'current_location', position: 10 }
  ]
});