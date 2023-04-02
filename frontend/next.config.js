const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    nextScriptWorkers: true,
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
