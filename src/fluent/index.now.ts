import '@servicenow/sdk/global';

// Import core tables
import './tables/surplus-asset.now.ts';
import './tables/surplus-request.now.ts';
import './tables/surplus-request-asset.now.ts';

// Import business rules
import './business-rules/surplus-asset-status-update.now.ts';
import './business-rules/surplus-request-calculations.now.ts';

// Import sample data for testing
import './sample-data/simple-test.now.ts';