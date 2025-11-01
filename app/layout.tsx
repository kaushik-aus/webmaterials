import "./globals.css";
import React from "react";

interface LiquidEtherBackgroundProps {
  opacity: number;
  speed: number;
  scale: number;
}

const LiquidEtherBackground: React.FC<LiquidEtherBackgroundProps> = ({
  opacity,
  speed,
  scale,
}) => {
  return (
    <div style={{ opacity }}>
      {/* Add your liquid ether background implementation here */}
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LiquidEtherBackground opacity={0.55} speed={0.35} scale={1.2} />
        {children}
      </body>
    </html>
  );
}
