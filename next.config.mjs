import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  // Disable Serwist in development since it doesn't support Turbopack yet
  disable: process.env.NODE_ENV !== "production",
});

export default withSerwist({
  // Your Next.js config
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },
  // Explicit turbopack configuration for Next.js 16
  turbopack: {},
});