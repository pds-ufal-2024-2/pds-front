/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // Se teu backend Laravel roda na porta 8080
        pathname: "/storage/photos/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", 
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:8080", // ou o frontend se for ao contrário
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-Requested-With, Content-Type, Authorization, X-XSRF-TOKEN",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
