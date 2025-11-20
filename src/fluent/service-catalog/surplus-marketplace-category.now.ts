import '@servicenow/sdk/global';
import { Record } from '@servicenow/sdk/core';
import { surplus_marketplace_catalog } from './surplus-marketplace-catalog.now';

// Create a Service Category for our Surplus Marketplace Catalog
export const surplus_marketplace_category = Record({
  $id: Now.ID['surplus-marketplace-category'],
  table: 'sc_category',
  data: {
    title: 'Surplus Asset Management',
    description: 'Request disposal and management of surplus assets',
    active: true,
    sc_catalog: surplus_marketplace_catalog,
    order: 100,
    homepage_renderer: 'fa3917107db72100ba13a5554ee4902a' // Default homepage renderer
  }
});