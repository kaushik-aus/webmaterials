import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Tailwind CSS is Working 🎉</h1>
      <p className="text-lg text-red-700">
        If you see this styled page, Tailwind is successfully configured!
      </p>
    </main>
  );
}
