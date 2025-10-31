import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { BackgroundCanvas } from "@/components/ui/BackgroundCanvas";
import { RouteTransition } from "@/components/motion/RouteTransition";

// Using system fonts as fallback due to network restrictions
const inter = { variable: "--font-inter" };
const playfair = { variable: "--font-playfair" };

export const metadata: Metadata = {
  title: "ModelMart — Buy and sell 3D models",
  description:
    "A marketplace for 3D artists to sell their models. Preview in 3D, purchase securely, and support creators.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    title: "ModelMart — Buy and sell 3D models",
    description:
      "A marketplace for 3D artists to sell their models. Preview in 3D, purchase securely, and support creators.",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ModelMart — Buy and sell 3D models",
    description:
      "A marketplace for 3D artists to sell their models. Preview in 3D, purchase securely, and support creators.",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* 3D viewer web component */}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased relative">
        <BackgroundCanvas />
        <CartProvider>
          <Navbar />
          <RouteTransition>
            <main className="min-h-[80vh] relative z-10">{children}</main>
          </RouteTransition>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
