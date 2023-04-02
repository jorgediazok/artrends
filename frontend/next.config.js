const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    images: {
      allowFutureImage: true,
      nextScriptWorkers: true,
    },
  },
};

module.exports = nextConfig;
