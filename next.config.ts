import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

const baseConfig: NextConfig = {
  // your existing config
};

const config = async (phase: string): Promise<NextConfig> => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const { withSerwist } = await import("./serwist-wrapper.mjs"); // must be JS
    return withSerwist(baseConfig);
  }

  return baseConfig;
};

export default config;