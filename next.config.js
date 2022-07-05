/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  apiUrl: "http://asparagus.local",
  images: {
    //enter the domain or subdomain where you have WordPress installed
    domains: ["asparagus.local"],
  },
};

module.exports = nextConfig;
