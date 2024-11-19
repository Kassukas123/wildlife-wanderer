'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const MinuKontoLink = () => {
  const { user } = useAuth();

  return (
    <Link href={user ? '/account' : '/login'} className="hover:underline">
      MINU KONTO
    </Link>
  );
};

export default MinuKontoLink;
