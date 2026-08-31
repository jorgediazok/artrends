const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    qualities: [75, 100],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
