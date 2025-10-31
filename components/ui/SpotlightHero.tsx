import Link from "next/link";

export function SpotlightHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient spotlight background */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(154, 107, 59, 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight">
            Premium 3D Models for Creators
          </h1>
          <p className="text-muted mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Discover high-quality 3D assets from talented artists. Preview live
            in 3D, purchase securely, and download instantly. Built for game
            developers, designers, and creative professionals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/models"
              className="btn text-base px-6 py-3"
              aria-label="Browse all 3D models"
            >
              Browse Models
            </Link>
            <Link
              href="/dashboard/upload"
              className="btn btn-secondary text-base px-6 py-3"
              aria-label="Upload your 3D models"
            >
              Upload Model
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
