import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

const nextConfig: NextConfig = {
  // your Next.js config here
};

const configExport = async (phase: string): Promise<NextConfig> => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const mod = await import("@serwist/next");
    const withSerwist = mod.default({
      swSrc: "public/service-worker/app-worker.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
      disable: process.env.NODE_ENV === "development",
    });

    return withSerwist(nextConfig);
  }

  return nextConfig;
};

export default configExport;