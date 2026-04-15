// config/payfast.js
import dotenv from 'dotenv';
import { PayFast } from 'node-payfast';

dotenv.config();

console.log(' ENV CHECK in payfast.js:', {
  sandboxEnv: process.env.PAYFAST_SANDBOX,
  merchantId: process.env.PAYFAST_MERCHANT_ID,
  passphraseSet: !!process.env.PAYFAST_PASSPHRASE
});

// Initialize PayFast instance

const payfastClient = new PayFast({
  sandbox: true,  // FORCE it to true for testing
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,
  passphrase: process.env.PAYFAST_PASSPHRASE
});

payfastClient.sandbox = true;

// Simple helper to get the PayFast URL
payfastClient.getPayfastUrl = function() {
  const url = this.sandbox
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process';
  
  console.log(' getPayfastUrl() called - sandbox:', this.sandbox, 'returning:', url);
  return url;
};

export default payfastClient;