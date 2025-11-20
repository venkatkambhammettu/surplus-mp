import '@servicenow/sdk/global';
import { Record } from '@servicenow/sdk/core';
import { surplus_marketplace_catalog } from './surplus-marketplace-catalog.now';
import { surplus_marketplace_category } from './surplus-marketplace-category.now';

// Create a Record Producer for Surplus Request (Updated)
export const surplus_request_producer = Record({
  $id: Now.ID['surplus-request-producer-v2'], // Changed ID to force recreation
  table: 'sc_cat_item_producer',
  data: {
    name: 'Surplus Asset Request',
    short_description: 'Request disposition of surplus assets',
    description: '<p>Use this form to submit a request for surplus asset disposition. Provide detailed information about the assets you want to dispose of and your preferred disposition method.</p><p><strong>What you\'ll need:</strong></p><ul><li>Business justification for surplus designation</li><li>Asset details and current location</li><li>Preferred disposition method</li><li>Timeline requirements</li></ul>',
    table_name: 'x_863538_surp_mp_surplus_request',
    active: true,
    type: 'item',
    state: 'published',
    category: surplus_marketplace_category, // Now pointing to the category
    sc_catalogs: surplus_marketplace_catalog, // This should point to the catalog
    no_cart: true,
    no_quantity: true,
    no_search: false,
    hide_sp: false,
    visible_standalone: true,
    visible_guide: true,
    visible_bundle: false,
    availability: 'on_both',
    order: 100,
    request_method: 'submit',
    redirect_url: 'generated_record'
  }
});