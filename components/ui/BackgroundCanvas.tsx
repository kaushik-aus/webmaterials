"use client";

import { GlowGrid } from "./GlowGrid";
import { Aurora } from "./Aurora";
import { Particles } from "./Particles";

export function BackgroundCanvas() {
  return (
    <>
      <div className="ambient-bg bg-noise" />
      <Aurora />
      <GlowGrid />
      <Particles />
    </>
  );
}
