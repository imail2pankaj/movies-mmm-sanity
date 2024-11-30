/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: {'cdn.sanity.io'},
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ], // Allow images from Sanity's CDN
    },
};

export default nextConfig;
