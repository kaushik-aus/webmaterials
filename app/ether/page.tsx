"use client";

import LiquidEtherBackground from "../components/LiquidEtherBackground";

export default function EtherDemoPage() {
  return (
    <>
      <LiquidEtherBackground opacity={0.55} speed={0.35} scale={1.2} />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-xl bg-white/80 backdrop-blur shadow-l p-6">
          <h1 className="text-2xl font-extrabold">Liquid Ether Background</h1>
          <p className="mt-2 text-neutral-700">
            This page demonstrates the marbled, anime‑style “Liquid Ether”
            background with subtle orange accents. It’s rendered with a tiny
            WebGL shader and falls back to layered radial gradients when WebGL
            is not available.
          </p>
          <ul className="mt-4 list-disc pl-5 text-neutral-700">
            <li>Borderless UI can sit on top with soft shadows</li>
            <li>Low GPU cost; capped DPR and minimal uniforms</li>
            <li>Fully responsive, fixed behind content</li>
          </ul>
        </div>
      </div>
    </>
  );
}
