'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Account() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in'); 
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Tere, {user}!</h1>
      <button
        onClick={() => {
          logout();
          router.push('/');
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logi välja
      </button>
    </div>
  );
}
