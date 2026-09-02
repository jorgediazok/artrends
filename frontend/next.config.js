const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
