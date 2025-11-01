# Liquid Ether Background

Adds a full-viewport, animated marbled background with soft orange accents (like the ModelMart mockup).

## Files

- `components/LiquidEtherBackground.tsx` — WebGL shader + CSS fallback
- `app/ether/page.tsx` — Demo page showing the background behind content

## Usage

1. Import and place the background once at the root of a page/layout:

```tsx
import LiquidEtherBackground from "@/components/LiquidEtherBackground";

export default function Page() {
  return (
    <>
      <LiquidEtherBackground opacity={0.55} speed={0.35} scale={1.2} />
      {/* your content */}
    </>
  );
}
```

2. Props:

- `opacity` (default `0.55`): overall alpha of the ether layer
- `speed` (default `0.35`): animation speed multiplier
- `scale` (default `1.2`): spatial frequency of the marbling

## Notes

- Uses Next.js App Router conventions; adjust import aliases as needed.
- The shader mixes white with warm accent tones to remain subtle under content.
- If WebGL is unavailable, a CSS radial-gradient fallback is applied automatically.
