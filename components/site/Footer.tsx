export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-10 bg-white/50">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">ModelMart</p>
          <p className="text-muted mt-2">
            A curated marketplace for 3D models. Support creators, ship faster.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Explore</p>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/models">Models</a>
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
      <div className="border-t border-muted/60">
        <div className="container py-4 text-sm text-muted">
          © {new Date().getFullYear()} ModelMart
        </div>
      </div>
    </footer>
  );
}
