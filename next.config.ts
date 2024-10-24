import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  transpilePackages: ['lucide-react'],
  swcMinify: true,
  experimental: {
    swcLoader: true,
    swcThreads: true,
    modern: true,
    topLevelAwait: true,
    esmExternals: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: true,
    reactStrictMode: true,
  },
  output: "standalone",
};

export default withSentryConfig(nextConfig, {
  org: "gaia-7w",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
