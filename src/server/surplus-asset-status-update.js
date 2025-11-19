import { gs, GlideRecord } from '@servicenow/glide';

// Business rule function to update surplus asset status when added to a request
export function updateSurplusAssetStatus(current, previous) {
    // Only run on insert or when the asset status in request changes
    if (current.isNewRecord() || current.asset_status_in_request.changes()) {
        
        var surplusAssetGR = new GlideRecord('x_863538_surp_mp_surplus_asset');
        if (surplusAssetGR.get(current.surplus_asset)) {
            var newStatus = '';
            
            // Map request asset status to surplus asset status
            switch (current.getValue('asset_status_in_request')) {
                case 'pending':
                case 'approved':
                    newStatus = 'in_disposition';
                    break;
                case 'in_disposition':
                    newStatus = 'in_disposition';
                    break;
                case 'completed':
                    newStatus = 'disposed';
                    break;
                case 'cancelled':
                    // Check if asset is in any other active requests
                    var otherRequestsGR = new GlideRecord('x_863538_surp_mp_surplus_request_asset');
                    otherRequestsGR.addQuery('surplus_asset', current.surplus_asset);
                    otherRequestsGR.addQuery('sys_id', '!=', current.sys_id);
                    otherRequestsGR.addQuery('asset_status_in_request', 'IN', 'pending,approved,in_disposition');
                    otherRequestsGR.query();
                    
                    if (!otherRequestsGR.hasNext()) {
                        // No other active requests, revert to approved status
                        newStatus = 'approved';
                    }
                    break;
            }
            
            // Update the surplus asset status if a new status was determined
            if (newStatus && surplusAssetGR.getValue('surplus_status') != newStatus) {
                surplusAssetGR.setValue('surplus_status', newStatus);
                surplusAssetGR.update();
                
                gs.addInfoMessage('Surplus asset status updated to: ' + newStatus);
            }
        }
    }
}