import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants';
import serwist from '@serwist/next';

/** @type {import('next').NextConfig} */
const baseConfig = {
  // your other config options
};

export default async function config(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = serwist({
      swSrc: "public/service-worker/app-worker.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
      disable: process.env.NODE_ENV === "development",
    });
    return withSerwist(baseConfig);
  }

  return baseConfig;
}