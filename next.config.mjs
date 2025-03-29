/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
      API_BASE_URL: process.env.API_BASE_URL,
      EXCHANGE_RATE_API_URL: process.env.EXCHANGE_RATE_API_URL,
    },
  };
  
  export default nextConfig;