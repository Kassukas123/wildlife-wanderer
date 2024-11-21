import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/navbar/NavbarComponent';
import './globals.css';

export const metadata = {
  title: 'Wildlife Wanderer',
  description: 'Explore the wild with ease.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen w-full flex flex-col items-center">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
