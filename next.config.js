/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move this out of experimental for Next.js 15
  serverExternalPackages: ["@aws-sdk/client-s3", "@supabase/supabase-js"],
};

module.exports = nextConfig;