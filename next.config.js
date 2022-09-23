/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  apiUrl: "http://asparagus.local",
  // apiUrl: "https://stage.asparagusmagazine.com",
  images: {
    // enter the domain or subdomain where you have WordPress installed
    domains: ["asparagus.local"],
    // domains: ["stage.asparagusmagazine.com"],
  },
  async redirects() {
    return [
      {
        source: "/test-broken-link",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
