/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/all",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
