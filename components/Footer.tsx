/**
 * Simple footer component
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-[#FF6600]"></div>
            <span className="text-xl font-bold">ModelMart</span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2024 ModelMart. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
