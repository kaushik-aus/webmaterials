"use client";

// Remove the custom JSX IntrinsicElements declaration from this file.
// Move it to a separate file named model-viewer.d.ts in your project root or inside types/ folder.

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
  // Guard against empty string sources
  if (!src || src.trim() === '') {
    return (
      <div style={{ 
        width: "100%", 
        height: "480px", 
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--text-muted)'
      }}>
        No model source provided
      </div>
    );
  }

  return (
    <model-viewer
      src={src}
      poster={poster || undefined}
      ar={ar}
      autoplay={autoRotate}
      camera-controls={cameraControls}
      exposure="1"
      shadow-intensity="0.4"
      style={{ width: "100%", height: "480px", borderRadius: 12 }}
    />
  );
}
