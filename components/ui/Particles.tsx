"use client";

type Props = { count?: number };

export default function Particles({ count = 32 }: Props) {
  const items = Array.from({ length: count });
  return (
    <div className="absolute inset-0">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 8;
        const size = 1 + Math.random() * 2;
        return (
          <span
            key={i}
            className="absolute rounded-full shadow-[0_0_10px_rgba(0,236,255,0.6)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: "rgba(0,236,255,0.9)",
              transform: "translate(-50%, -50%)",
              animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            box-shadow: 0 0 6px rgba(0, 236, 255, 0.4);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 16px rgba(0, 236, 255, 0.8);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
