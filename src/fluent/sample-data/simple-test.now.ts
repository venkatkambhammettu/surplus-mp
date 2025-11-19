import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Working test surplus request record with all mandatory fields
Record({
    $id: Now.ID['working_test_request'],
    table: 'x_863538_surp_mp_surplus_request',
    data: {
        short_description: 'Test Surplus Request - Office Equipment',
        description: 'Test record to verify surplus request table functionality and data creation',
        request_type: 'disposition',
        disposition_method: 'sell',
        request_status: 'draft',
        requestor: '6816f79cc0a8016401c5a33be04be441', // admin user sys_id
        business_justification: 'Test record to verify surplus request table functionality and data creation'
    }
})