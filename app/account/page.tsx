"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Account() {
  const supabase = createClient();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [commentedTrails, setCommentedTrails] = useState<any[] | null>(null);
  const [savedTrails, setSavedTrails] = useState<any[] | null>(null);
  const [bio, setBio] = useState<string>("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); 

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const fetchUserId = async () => {
      try {
        const { data: userProfile, error: profileError } = await supabase
          .from("Users")
          .select("id, bio")
          .eq("username", user)
          .single();

        if (profileError) {
          console.error(
            "Profiili laadimine ebaõnnestus:",
            profileError.message
          );
        } else {
          console.log("Kasutaja andmed:", userProfile); 
          setBio(userProfile?.bio || "");
          setUserId(userProfile?.id || null);
        }

        setCommentedTrails([]);
        setSavedTrails([]);
      } catch (err) {
        console.error("Tekkis viga andmete laadimisel:", err);
      }
    };

    fetchUserId();
  }, [user, router]);

  const handleSaveBio = async () => {
    if (!bio.trim()) {
      alert("Bio ei saa olla tühi!");
      return;
    }

    if (!userId) {
      alert("Kasutaja ID puudub!");
      return;
    }

    try {
      const { error } = await supabase
        .from("Users")
        .update({ bio })
        .eq("id", userId);

      if (error) {
        console.error("Bio salvestamine ebaõnnestus:", error.message);
        alert("Bio salvestamine ebaõnnestus: " + error.message);
      } else {
        alert("Bio salvestatud!");
        setIsEditingBio(false);
      }
    } catch (err) {
      console.error("Tekkis viga:", err);
      alert("Tekkis ootamatu viga.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="w-full max-w-7xl px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-gray-700">Tere, {user}!</h2>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logi välja
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Profiili info</h2>
          <label className="block mb-2 text-sm">Kasutajanimi:</label>
          <input
            type="text"
            placeholder="Kasutajanimi"
            className="w-full border rounded p-2 mb-4"
            readOnly
            value={user}
          />
          <label className="block mb-2 text-sm">Bio:</label>
          {isEditingBio ? (
            <>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Sisesta bio"
                className="w-full border rounded p-2 mb-4"
                rows={4}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveBio}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Salvesta
                </button>
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Tühista
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-700 mb-4">
                {bio.trim() ? bio : "Pole veel lisatud bio."}
              </p>
              <button
                onClick={() => setIsEditingBio(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Muuda bio
              </button>
            </>
          )}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Muuda parooli
          </button>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">
              Minu kommenteeritud rajad
            </h2>
            {commentedTrails === null ? (
              <p className="text-sm text-gray-500">Laadimine...</p>
            ) : commentedTrails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commentedTrails.map((trail, i) => (
                  <div key={i} className="border rounded p-4 shadow-sm">
                    <h3 className="font-medium mb-2">{trail.name}</h3>
                    <p className="text-sm text-gray-600">{trail.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Pole veel lisatud kommenteeritud radu.
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Salvestatud rajad</h2>
            {savedTrails === null ? (
              <p className="text-sm text-gray-500">Laadimine...</p>
            ) : savedTrails.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {savedTrails.map((trail, i) => (
                  <div key={i} className="border rounded p-4 shadow-sm">
                    <img
                      src={trail.image || "/path/to/default-image.jpg"}
                      alt="Raja pilt"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-medium">{trail.name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Pole veel salvestatud radu.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
