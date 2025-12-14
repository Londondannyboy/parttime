import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect old /articles/[slug] to root-level /[slug] for SEO preservation
      {
        source: '/articles/:slug',
        destination: '/:slug',
        permanent: true, // 301 redirect for SEO
      },
      // Redirect /part-time-jobs-london to new SEO-optimized URL for "part-time jobs UK"
      {
        source: '/part-time-jobs-london',
        destination: '/uk-part-time-jobs-uk-london-part-time-jobs-london',
        permanent: true, // 301 redirect for SEO
      },
      // Redirect part-time pages to new SEO-optimized URLs with "jobs-uk" suffix
      {
        source: '/part-time-cfo',
        destination: '/part-time-cfo-jobs-uk',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/part-time-cmo',
        destination: '/part-time-cmo-jobs-uk',
        permanent: true, // 301 redirect for SEO
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Enable Link prefetching for better performance
          {
            key: "Link",
            value: "</part-time-jobs>; rel=prefetch, </part-time-jobs-articles>; rel=prefetch",
          },
        ],
      },
    ];
  },

  images: {
    unoptimized: true, // For Vercel deployment
  },

  // Optimize CSS and package imports for modern browsers
  experimental: {
    // Tree-shake heavy packages more aggressively
    optimizePackageImports: [
      "@tailwindcss/typography",
      "react-markdown",
      "@humeai/voice-react",
      "@mux/mux-player-react",
      "@stackframe/stack",
      "@neondatabase/serverless",
      "zod",
    ],
    // Inline critical CSS to eliminate render-blocking requests
    optimizeCss: true,
  },
};

export default nextConfig;
