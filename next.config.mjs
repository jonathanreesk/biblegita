/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Steps 1 and 2 were merged; old links to the second land on its section
  async redirects() {
    return [
      { source: "/journey/method", destination: "/journey/made#before", permanent: true },
      { source: "/journey/problem", destination: "/journey/made#approach", permanent: true },
    ];
  },
};

export default nextConfig;
