import '@servicenow/sdk/global';
import { Record } from '@servicenow/sdk/core';

// Create a custom view for the surplus asset form
export const surplus_asset_default_view = Record({
  $id: Now.ID['surplus_asset_default_view'],
  table: 'sys_ui_view',
  data: {
    name: 'surplus_asset_default',
    title: 'Surplus Asset Default View'
  }
});

// Note: Form API may not be available in current SDK version
// The view record above can be used when Form API becomes available
// or when creating forms through other mechanisms