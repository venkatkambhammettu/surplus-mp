import '@servicenow/sdk/global';
import { Record } from '@servicenow/sdk/core';
import { surplus_marketplace_catalog } from '../service-catalog/surplus-marketplace-catalog.now';

// Create a Service Portal for Surplus Marketplace based on the existing Service Portal template
export const surplus_marketplace_portal = Record({
  $id: Now.ID['surplus-marketplace-portal'],
  table: 'sp_portal',
  data: {
    title: 'Surplus Marketplace Portal',
    url_suffix: 'surplus',
    sc_catalog: surplus_marketplace_catalog,
    homepage: '46cc384147532100ba13a5554ee49009', // Using existing Service Portal homepage
    theme: '281507c44317d210ca4c1f425db8f2fd', // Using existing Service Portal theme
    sp_rectangle_menu: 'd150fd31cb10020000f8d856634c9ce6', // Using existing menu
    login_page: '36c61807cb31120000f8d856634c9ca9', // Using existing login page
    notfound_page: '3c2c9063cb11020000f8d856634c9c1f', // Using existing 404 page
    kb_knowledge_page: '26c2e030d7201200a9addd173e24d437', // Using existing knowledge page
    inactive: false,
    default: false,
    enable_ais: true,
    enable_favorites: false,
    rtl_enabled: true,
    css_variables: '$grid-gutter-width: 15px !default;',
    quick_start_config: '[{\n\t"tagline": {\n\t\t"table" : "sp_instance",\n\t\t"sys_id" : "34fe3d96cb20020000f8d856634c9cf4",\n\t\t"field" : "title"\n\t},\n\t"hero_background": {\n\t\t"table" : "sp_container",\n\t\t"sys_id" : "be98a8d2cb20020000f8d856634c9c63",\n\t\t"field" : "background_image"\n\t},\n\t"readonly_variable_editor": "false"\n}]'
  }
});