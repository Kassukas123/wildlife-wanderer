"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function Account() {
  const supabase = createClient();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [commentedTrails, setCommentedTrails] = useState<any[] | null>(null);
  const [bio, setBio] = useState<string>("");
  const [isEditingBio, setIsEditingBio] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const { data: userProfile, error } = await supabase
          .from("Users")
          .select("id, bio")
          .eq("username", user.username)
          .single();

        if (error) {
          console.error("Profiili laadimine ebaõnnestus:", error.message);
        } else {
          setBio(userProfile?.bio || "");
        }
      } catch (err) {
        console.error("Tekkis viga andmete laadimisel:", err);
      }
    };

    const fetchUserComments = async () => {
      if (!user) return;

      try {
        const { data: userComments, error } = await supabase
          .from("Comments")
          .select("id, comment, created_at, Trails(id, name)")
          .eq("user_id", user.userId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Kommentaaride laadimine ebaõnnestus:", error.message);
        } else {
          console.log("Kommentaarid:", userComments);
          setCommentedTrails(userComments || []);
        }
      } catch (err) {
        console.error("Tekkis viga andmete laadimisel:", err);
      }
    };
    fetchUserProfile();
    fetchUserComments();
  }, [user, router]);

  const handleSaveBio = async () => {
    if (!bio.trim()) {
      alert("Bio ei saa olla tühi!");
      return;
    }

    try {
      const { error } = await supabase
        .from("Users")
        .update({ bio })
        .eq("username", user?.username);

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
          <h2 className="text-lg text-gray-700">Tere, {user.username}!</h2>
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
            value={user.username}
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
        </div>

        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800">
              Minu kommenteeritud rajad
            </h2>
            {commentedTrails && commentedTrails.length > 0 ? (
              <ul className="space-y-4">
                {commentedTrails.map((trail, i) => (
                <li
                  key={i}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >
                  {trail.Trails?.name ? (
                    <h3 className="font-semibold text-lg text-blue-600 mb-2">
                      <Link href={`/trail/${trail.Trails?.id}`} className="hover:underline">
                        {trail.Trails.name}
                      </Link>
                    </h3>
                  ) : (
                    <h3 className="font-semibold text-lg text-gray-600 mb-2">
                      Nimi puudub
                    </h3>
                  )}
                  <p className="text-sm text-gray-700 mb-2">{trail.comment}</p>
                  <p className="text-xs text-gray-500 italic">
                    {trail.created_at
                      ? new Date(trail.created_at).toLocaleDateString("et-EE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Kuupäev puudub"}
                  </p>
                </li>
              ))}
            </ul>
          ) : commentedTrails === null ? (
            <p className="text-sm text-gray-500">Laadimine...</p>
          ) : (
            <p className="text-sm text-gray-500">
              Pole veel lisatud kommenteeritud radu.
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
