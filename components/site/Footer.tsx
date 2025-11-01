import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: 'var(--border)' }}>
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl gradient-text">ModelMart</p>
          <p className="text-muted mt-2">
            A curated marketplace for 3D models. Support creators, ship faster.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Explore</p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/models" className="link-hover">Models</Link>
            </li>
            <li>
              <span className="opacity-60 pointer-events-none" aria-disabled>
                Categories (soon)
              </span>
            </li>
            <li>
              <span className="opacity-60 pointer-events-none" aria-disabled>
                Privacy
              </span>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Community</p>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="opacity-60 pointer-events-none" aria-disabled>
                Discord (soon)
              </span>
            </li>
            <li>
              <span className="opacity-60 pointer-events-none" aria-disabled>
                Blog (soon)
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container py-4 text-sm text-muted">
          © {new Date().getFullYear()} ModelMart
        </div>
      </div>
    </footer>
  );
}
