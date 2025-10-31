"use client";

import Aurora from "./Aurora";
import GlowGrid from "./GlowGrid";
import Particles from "./Particles";

export default function BackgroundStage() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Aurora />
      <GlowGrid />
      <Particles count={40} />
    </div>
  );
}
