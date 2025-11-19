import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide';

// Calculate totals for surplus request asset records
export function calculateRequestAssetTotals(current, previous) {
    // Calculate total estimated and actual values for the request asset record
    var quantity = parseInt(current.getValue('quantity') || '1');
    var unitEstimatedValue = parseFloat(current.getValue('unit_estimated_value') || '0');
    var unitActualValue = parseFloat(current.getValue('unit_actual_value') || '0');
    
    current.setValue('total_estimated_value', (quantity * unitEstimatedValue).toFixed(2));
    current.setValue('total_actual_value', (quantity * unitActualValue).toFixed(2));
}

// Calculate days to disposition when disposition is completed
export function calculateDaysToDisposition(current, previous) {
    if (current.actual_disposition_date.changes() && current.getValue('actual_disposition_date')) {
        var addedDate = new GlideDateTime(current.getValue('added_to_request_date'));
        var dispositionDate = new GlideDateTime(current.getValue('actual_disposition_date'));
        
        var duration = GlideDateTime.subtract(addedDate, dispositionDate);
        var days = duration.getDayPart();
        
        current.setValue('days_to_disposition', days);
    }
}

// Update surplus request totals when request assets change
export function updateSurplusRequestTotals(current, previous) {
    var requestId = current.getValue('surplus_request');
    if (requestId) {
        // Calculate totals for the request
        var requestAssetGR = new GlideRecord('x_863538_surp_mp_surplus_request_asset');
        requestAssetGR.addQuery('surplus_request', requestId);
        requestAssetGR.query();
        
        var totalAssets = 0;
        var totalEstimatedValue = 0;
        var totalActualValue = 0;
        
        while (requestAssetGR.next()) {
            totalAssets += parseInt(requestAssetGR.getValue('quantity') || '1');
            totalEstimatedValue += parseFloat(requestAssetGR.getValue('total_estimated_value') || '0');
            totalActualValue += parseFloat(requestAssetGR.getValue('total_actual_value') || '0');
        }
        
        // Update the surplus request record
        var requestGR = new GlideRecord('x_863538_surp_mp_surplus_request');
        if (requestGR.get(requestId)) {
            requestGR.setValue('total_assets', totalAssets);
            requestGR.setValue('estimated_total_value', totalEstimatedValue.toFixed(2));
            requestGR.setValue('actual_total_value', totalActualValue.toFixed(2));
            
            // Calculate net recovery value (actual value minus disposal costs)
            var disposalCost = parseFloat(requestGR.getValue('total_disposal_cost') || '0');
            var netRecovery = totalActualValue - disposalCost;
            requestGR.setValue('net_recovery_value', netRecovery.toFixed(2));
            
            requestGR.update();
        }
    }
}