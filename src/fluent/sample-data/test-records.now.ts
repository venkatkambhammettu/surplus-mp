import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Surplus Asset Records
Record({
    $id: Now.ID['test_surplus_asset_1'],
    table: 'x_863538_surp_mp_surplus_asset',
    data: {
        // Asset Management inherited fields
        asset_tag: 'LAPTOP-001',
        display_name: 'Dell Latitude 5520 - Marketing Dept',
        model_category: 'Computer',
        manufacturer: 'Dell Inc.',
        model: 'Latitude 5520',
        serial_number: 'DL5520-001-2022',
        
        // Surplus-specific fields
        surplus_reason: 'technology_upgrade',
        condition_assessment: 'good',
        preferred_disposition: 'redeploy',
        estimated_value: 800,
        market_value: 750,
        current_location: 'Building A - Floor 3 - Marketing',
        surplus_status: 'identified',
        disposition_priority: 'medium',
        surplus_notes: 'Functional laptop being replaced due to company-wide upgrade to newer models',
        data_sanitization_required: true,
        environmental_considerations: 'Standard laptop disposal - no special requirements'
    }
})

Record({
    $id: Now.ID['test_surplus_asset_2'],
    table: 'x_863538_surp_mp_surplus_asset',
    data: {
        asset_tag: 'CHAIR-045',
        display_name: 'Herman Miller Aeron Chair - Size B',
        model_category: 'Furniture',
        manufacturer: 'Herman Miller',
        model: 'Aeron Chair Size B',
        serial_number: 'HM-AERON-045-2019',
        
        surplus_reason: 'downsizing',
        condition_assessment: 'excellent',
        preferred_disposition: 'sell',
        estimated_value: 450,
        market_value: 400,
        current_location: 'Building B - Floor 2 - Finance',
        surplus_status: 'approved',
        disposition_priority: 'low',
        surplus_notes: 'High-quality office chair in excellent condition from office downsizing',
        data_sanitization_required: false,
        environmental_considerations: 'Minimal environmental impact - recyclable materials'
    }
})

Record({
    $id: Now.ID['test_surplus_asset_3'],
    table: 'x_863538_surp_mp_surplus_asset',
    data: {
        asset_tag: 'SERVER-009',
        display_name: 'HP ProLiant DL380 Server',
        model_category: 'Computer',
        manufacturer: 'HP',
        model: 'ProLiant DL380 Gen9',
        serial_number: 'HP-DL380-009-2018',
        
        surplus_reason: 'end_of_life',
        condition_assessment: 'fair',
        preferred_disposition: 'recycle',
        estimated_value: 200,
        market_value: 150,
        current_location: 'Data Center - Rack 15',
        surplus_status: 'in_disposition',
        disposition_priority: 'high',
        surplus_notes: 'End-of-life server requiring data sanitization before disposal',
        data_sanitization_required: true,
        data_sanitization_method: 'DOD 5220.22-M 3-pass',
        environmental_considerations: 'Electronic waste - requires certified e-waste recycling'
    }
})

// Sample Surplus Request Records
Record({
    $id: Now.ID['test_surplus_request_1'],
    table: 'x_863538_surp_mp_surplus_request',
    data: {
        // Case inherited fields
        short_description: 'Q1 2024 Office Equipment Disposition Request',
        description: 'Disposition request for surplus office equipment identified during Q1 inventory review. Includes laptops from technology refresh and furniture from office downsizing.',
        
        // Surplus Request specific fields
        request_type: 'disposition',
        disposition_method: 'sell',
        requestor_department: 'IT Operations',
        business_justification: 'Annual inventory review identified surplus assets taking up valuable storage space. Disposition will recover value and free up space for new equipment.',
        request_status: 'submitted',
        requires_approval: true,
        approval_level: 'manager',
        cost_center: 'IT-001',
        project_code: 'SURPLUS-Q1-2024',
        pickup_location: 'Building A - Loading Dock',
        estimated_total_value: 1250,
        compliance_review_required: true,
        data_security_review_required: true,
        environmental_review_required: false,
        special_instructions: 'All IT equipment must undergo data sanitization before disposition. Coordinate pickup with facilities team.',
        delivery_instructions: 'Items will be staged at Building A loading dock. Available for pickup Monday-Friday 8AM-5PM.'
    }
})

Record({
    $id: Now.ID['test_surplus_request_2'],
    table: 'x_863538_surp_mp_surplus_request',
    data: {
        short_description: 'Emergency Server Disposal Request',
        description: 'Urgent disposal request for end-of-life server equipment that needs immediate removal from data center.',
        
        request_type: 'disposition',
        disposition_method: 'recycle',
        requestor_department: 'Data Center Operations',
        business_justification: 'End-of-life server equipment occupying valuable rack space in production data center. Immediate removal required for new equipment installation.',
        request_status: 'approved',
        requires_approval: true,
        approval_level: 'director',
        cost_center: 'DC-001',
        project_code: 'DC-REFRESH-2024',
        pickup_location: 'Data Center - Service Entrance',
        estimated_total_value: 200,
        compliance_review_required: true,
        data_security_review_required: true,
        environmental_review_required: true,
        special_instructions: 'Critical: All servers must be fully data wiped using DOD standards before removal. Coordinate with security team.',
        delivery_instructions: 'Items require special handling due to weight. Coordinate with data center operations team for access.'
    }
})