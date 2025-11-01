import "./globals.css";
import React from "react";
import LiquidEtherBackground from "./components/LiquidEtherBackground";

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
