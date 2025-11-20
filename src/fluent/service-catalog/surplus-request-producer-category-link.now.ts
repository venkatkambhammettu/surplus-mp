import '@servicenow/sdk/global';
import { Record } from '@servicenow/sdk/core';
import { surplus_marketplace_category } from './surplus-marketplace-category.now';
import { surplus_request_producer } from './surplus-request-producer.now';

// Create the linking record between category and catalog item
export const surplus_request_producer_category_link = Record({
  $id: Now.ID['surplus-request-producer-category-link'],
  table: 'sc_cat_item_category',
  data: {
    sc_cat_item: surplus_request_producer,
    sc_category: surplus_marketplace_category
  }
});