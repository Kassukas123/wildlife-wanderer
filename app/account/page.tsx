'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Account() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-700">Tere, {user}!</h2>
        <button
          onClick={() => {
            logout();
            router.push('/');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logi välja
        </button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Profiili info</h2>
          <label className="block mb-2 text-sm">Kasutajanimi:</label>
          <input
            type="text"
            placeholder="Kasutajanimi"
            className="w-full border rounded p-2 mb-4"
            readOnly
            value={user}
          />
          <label className="block mb-2 text-sm">E-mail:</label>
          <input
            type="text"
            placeholder="E-mail"
            className="w-full border rounded p-2 mb-4"
            readOnly
          />
          <label className="block mb-2 text-sm">Bio:</label>
          <textarea
            placeholder="Bio"
            className="w-full border rounded p-2 mb-4"
            rows={4}
            readOnly
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Muuda parooli
          </button>
        </div>

        <div className="col-span-12 md:col-span-8 space-y-6">
        {/*kommenteeritud rajad*/}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Minu kommenteeritud rajad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded p-4 shadow-sm">
                  <h3 className="font-medium mb-2">Raja nimi</h3>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a odio mauris.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Salvestatud rajad */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Salvestatud rajad</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded p-4 shadow-sm">
                  <img
                    src="https://cdn.pixabay.com/photo/2020/02/07/21/12/everest-4828404_1280.png"
                    alt="Raja pilt"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="font-medium">Raja nimi</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
