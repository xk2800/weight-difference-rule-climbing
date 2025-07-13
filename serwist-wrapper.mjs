import serwist from "@serwist/next";

export function withSerwist(config) {
  return serwist({
    swSrc: "public/service-worker/app-worker.ts",
    swDest: "public/sw.js",
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === "development",
  })(config);
}