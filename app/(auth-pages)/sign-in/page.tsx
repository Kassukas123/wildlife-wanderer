'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Palun täida kõik väljad!');
      return;
    }

    const success = login(username, password);
    if (success) {
      router.push('/account');
    } else {
      alert("Vale kasutajanimi või parool");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Logi sisse</h1>
      <input
        type="text"
        placeholder="Kasutajanimi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded p-2 mb-4"
      />
      <input
        type="password"
        placeholder="Parool"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2 mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Logi sisse
      </button>

      <p className='mt-4 text-sm'>
        Pole veel kontot?{' '}
        <Link href="/sign-up" className="text-blue-500 underline">
          Registreeri
        </Link>
      </p>
    </div>
  );
}
