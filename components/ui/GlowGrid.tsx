"use client";

export default function GlowGrid() {
  return (
    <div className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid),1px,transparent 1px), linear-gradient(90deg,var(--grid),1px,transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
          animation: "gridPan 20s linear infinite",
        }}
      />
      <style jsx global>{`
        @keyframes gridPan {
          0% {
            background-position: 0px 0px, 0px 0px;
          }
          100% {
            background-position: 80px 80px, 80px 80px;
          }
        }
      `}</style>
    </div>
  );
}
