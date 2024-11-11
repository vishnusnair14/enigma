/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "e7.pngegg.com",
        },
          {
          protocol: "https",
          hostname: "upload.wikimedia.org",
        },
        {
          protocol: "https",
          hostname: "developers.google.com",
        },
      ],
    },
  };
  
  export default nextConfig;
