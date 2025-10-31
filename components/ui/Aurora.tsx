"use client";

export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-1/3 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,236,255,0.25), transparent 70%)",
          filter: "saturate(1.2)",
          animation: "drift 24s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -bottom-1/3 left-1/3 h-[70vmax] w-[70vmax] rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(closest-side, rgba(214,89,255,0.22), transparent 70%)",
          animation: "drift2 26s ease-in-out infinite alternate",
        }}
      />
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .aurora * {
            animation: none !important;
          }
        }
        @keyframes drift {
          from {
            transform: translate(-50%, 0) rotate(0deg);
          }
          to {
            transform: translate(-40%, 10%) rotate(8deg);
          }
        }
        @keyframes drift2 {
          from {
            transform: translate(0, 0) rotate(0deg);
          }
          to {
            transform: translate(10%, -6%) rotate(-6deg);
          }
        }
      `}</style>
    </div>
  );
}
