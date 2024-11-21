'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="w-full bg-gray-200 py-3 flex justify-center">
        <h1 className="text-xl font-semibold tracking-wide">
          WILDLIFE WANDERER
        </h1>
      </div>

      <nav className="w-full bg-gray-100 py-3 flex justify-center space-x-12">
        <Link href="/" className="hover:underline text-sm font-medium">
          AVALEHT
        </Link>
        <Link href="/map" className="hover:underline text-sm font-medium">
          KAART
        </Link>
        <Link href="/account" className="hover:underline text-sm font-medium">
          MINU KONTO
        </Link>
      </nav>
    </header>
  );
}
