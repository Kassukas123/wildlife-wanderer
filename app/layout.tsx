import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Wildlife Wanderer",
  description: "Explore the wild with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="min-h-screen w-full flex flex-col items-center">

          <nav className="w-full bg-gray-200 flex flex-col items-center">
            <div className="py-2 w-full text-center font-semibold">
              WILDLIFE WANDERER
            </div>
            <div className="w-full bg-gray-100 py-1 flex justify-center gap-8">
              <Link href="/" className="hover:underline">
                AVALEHT
              </Link>
              <Link href="/map" className="hover:underline">
                KAART
              </Link>
              <Link href="/account" className="hover:underline">
                MINU KONTO
              </Link>
            </div>
          </nav>

          <div className="w-full flex-grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
