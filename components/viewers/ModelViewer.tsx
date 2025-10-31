"use client";

import React from "react";

// Uses the <model-viewer> Web Component (loaded in layout.tsx Script)
export function ModelViewer({
  src,
  poster,
  ar = false,
  autoRotate = true,
  cameraControls = true,
}: {
  src: string;
  poster?: string;
  ar?: boolean;
  autoRotate?: boolean;
  cameraControls?: boolean;
}) {
  return React.createElement("model-viewer", {
    src,
    poster,
    ar,
    autoplay: autoRotate,
    "camera-controls": cameraControls,
    exposure: "1",
    "shadow-intensity": "0.4",
    style: { width: "100%", height: "480px", borderRadius: 12 },
  });
}
