import type { Metadata } from "next";
import "./globals.css";
import LiquidEther from "@/components/ui/LiquidEther";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import RouteTransition from "@/components/motion/RouteTransition";
import SiteBrand from "@/components/site/SiteBrand";

export const metadata: Metadata = {
  title: "ModelMart — Futuristic Marketplace",
  description: "A dark, neon market for 3D assets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black">
        {/* Background sits behind everything */}
        <div className="fixed inset-0 -z-10">
          <LiquidEther
            colors={["#16E3FF", "#8A5BFF", "#F0E7FF"]}
            resolution={0.5}
            autoDemo
            autoSpeed={0.55}
            autoIntensity={2}
            autoResumeDelay={0}
            autoRampDuration={0.2}
            baseOpacity={0.12}
            style={{ opacity: 1 }}
          />
        </div>

        <SiteBrand name="ModelMart" />
        <Navbar />

        <RouteTransition>
          <main className="relative z-10">{children}</main>
        </RouteTransition>

        <Footer />
      </body>
    </html>
  );
}
