export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="container py-10 border-t border-glass text-sm text-zinc-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} ModelMart</div>
          <div className="flex items-center gap-4">
            <a href="/models" className="hover:text-cyan-300 transition">
              Browse
            </a>
            <a
              href="/dashboard/upload"
              className="hover:text-cyan-300 transition"
            >
              Upload
            </a>
            <a href="/(auth)/signin" className="hover:text-cyan-300 transition">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
