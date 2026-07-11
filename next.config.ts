import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(self), geolocation=(self), microphone=()",
  },
];

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/hvostokratya" : undefined,
  assetPrefix: isGitHubPages ? "/hvostokratya/" : undefined,
  trailingSlash: isGitHubPages,
  images: isGitHubPages ? { unoptimized: true } : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: !isGitHubPages,
  async headers() {
    if (isGitHubPages) {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
