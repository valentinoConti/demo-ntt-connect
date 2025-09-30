/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // Disable source maps in development to reduce console noise
  productionBrowserSourceMaps: false,
  // Enable static export for GitHub Pages
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configure for GitHub Pages deployment
  basePath: "",
  assetPrefix: "",
  experimental: {
    esmExternals: "loose",
  },
  // Disable problematic features for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer, webpack }) => {
    // Essential fallbacks for Wormhole Connect
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
      buffer: false,
      util: false,
      child_process: false,
      worker_threads: false,
      module: false,
    };

    // Ignore problematic modules during build
    config.externals = config.externals || [];
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    // Handle module resolution issues
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Add DefinePlugin to handle environment variables properly
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      })
    );

    return config;
  },
  // Transpile Wormhole packages
  transpilePackages: ["@wormhole-foundation/wormhole-connect"],
  // Reduce console output
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
