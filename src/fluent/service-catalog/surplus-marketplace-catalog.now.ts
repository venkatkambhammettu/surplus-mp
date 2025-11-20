import '@servicenow/sdk/global';
import { Record } from '@servicenow/sdk/core';

// Create a Service Catalog for Surplus Marketplace
export const surplus_marketplace_catalog = Record({
  $id: Now.ID['surplus-marketplace-catalog'],
  table: 'sc_catalog',
  data: {
    title: 'Surplus Marketplace Catalog',
    description: 'Submit requests for surplus asset disposition and manage surplus assets',
    active: true
  }
});