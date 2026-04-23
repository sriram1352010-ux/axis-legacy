/** @type {import('next').NextConfig} */
const nextConfig = {
  /* MNC-Grade Optimization: 
     Combining all external packages into a single configuration array.
     This ensures Supabase, AWS, and Razorpay all function correctly 
     in the Next.js App Router environment.
  */
  serverExternalPackages: [
    "razorpay", 
    "@supabase/supabase-js", 
    "@aws-sdk/client-s3"
  ],
};

module.exports = nextConfig;