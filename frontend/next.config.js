const withSvgr = require("next-plugin-svgr");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = withSvgr(nextConfig);
