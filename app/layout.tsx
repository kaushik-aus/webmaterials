import "./globals.css";
import LiquidEtherBackground from "@/components/LiquidEtherBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ModelMart - Premium 3D Assets",
  description: "Discover anime-style 3D models, textures, and environments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <LiquidEtherBackground opacity={0.55} speed={0.35} scale={1.2} />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
