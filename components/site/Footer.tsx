import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: 'var(--border)' }}>
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">ModelMart</p>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
            A curated marketplace for 3D models. Support creators, ship faster.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Explore</p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/models">Models</Link>
            </li>
            <li>
              <a className="opacity-60 pointer-events-none" aria-disabled>
                Categories (soon)
              </a>
            </li>
            <li>
              <a className="opacity-60 pointer-events-none" aria-disabled>
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Community</p>
          <ul className="space-y-1 text-sm">
            <li>
              <a className="opacity-60 pointer-events-none" aria-disabled>
                Discord (soon)
              </a>
            </li>
            <li>
              <a className="opacity-60 pointer-events-none" aria-disabled>
                Blog (soon)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} ModelMart
        </div>
      </div>
    </footer>
  );
}
