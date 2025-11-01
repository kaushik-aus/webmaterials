import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ModelMart — The Future of 3D Assets",
  description:
    "Discover premium anime-style 3D models for games, animation, and VR. Join thousands of creators who trust ModelMart.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    title: "ModelMart — The Future of 3D Assets",
    description:
      "Discover premium anime-style 3D models for games, animation, and VR. Join thousands of creators who trust ModelMart.",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80&auto=format&fit=crop",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ModelMart — The Future of 3D Assets",
    description:
      "Discover premium anime-style 3D models for games, animation, and VR. Join thousands of creators who trust ModelMart.",
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
    <html lang="en">
      <body className="min-h-screen font-sans">
        <Header />
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container text-center text-sm text-gray-600">
            <p>&copy; 2025 ModelMart. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
