import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import Navbar from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

// Fallback to system fonts if Google Fonts are unavailable
const fontVariables = {
  '--font-inter': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '--font-playfair': 'Georgia, "Times New Roman", serif',
};

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
    <html lang="en" style={fontVariables as React.CSSProperties}>
      <head>
        {/* 3D viewer web component */}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen text-ink antialiased" style={{ background: 'var(--bg)' }}>
        <CartProvider>
          <Navbar />
          <main className="min-h-[80vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
