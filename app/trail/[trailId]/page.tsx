"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { use } from "react";

export default function TrailPage({ params }: { params: Promise<{ trailId: string }> }) {
  const { trailId } = use(params); 

  const supabase = createClient();
  const { user } = useAuth(); 
  const [trail, setTrail] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrail = async () => {
      if (!trailId) return;

      const { data: trail, error } = await supabase
        .from("Trails")
        .select(
          "id, name, length, type, parking, camping, campfire, accessibility, county, berries_mushrooms, sightseeing, picture"
        )
        .eq("id", trailId)
        .single();

      if (error) {
        setErrorMessage("Rada ei õnnestunud laadida.");
      } else {
        setTrail(trail);
      }
    };

    fetchTrail();
  }, [trailId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Kommentaar ei saa olla tühi!");
      return;
    }

    if (!user) {
      alert("Palun logige sisse enne kommentaaride lisamist.");
      return;
    }

    try {
      const { error } = await supabase.from("Comments").insert([
        {
          trail_id: trailId,
          user_id: user.userId, 
          comment,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Kommentaari lisamine ebaõnnestus:", error.message);
        alert("Kommentaari salvestamine ebaõnnestus.");
      } else {
        alert("Kommentaar lisatud!");
        setComment(""); 
      }
    } catch (err) {
      console.error("Tekkis viga:", err);
      alert("Tekkis ootamatu viga.");
    }
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!trail) {
    return <div>Rada ei leitud.</div>;
  }

  return (
    <div>
      <h1>{trail.name}</h1>
      <p>Pikkus: {trail.length} km</p>
      <p>Tüüp: {trail.type}</p>
      <p>Parkimine: {trail.parking ? "olemas" : "puudub"}</p>
      <p>Telkimine: {trail.camping ? "olemas" : "puudub"}</p>
      <p>Lõkke tegemine: {trail.campfire ? "olemas" : "puudub"}</p>
      <p>Ligipääsetavus: {trail.accessibility}</p>
      <p>Maakond: {trail.county}</p>
      <p>Korilus: {trail.berries_mushrooms}</p>
      <p>Vaatamisväärsused: {trail.sightseeing}</p>
      <p>
        Pilt:{" "}
        {trail.picture && (
          <img
            src={trail.picture}
            alt={trail.name}
            style={{ width: "100%", maxWidth: "600px" }}
          />
        )}
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-medium mb-4">Lisa kommentaar</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Sisesta oma kommentaar"
            className="w-full border rounded p-2 mb-4"
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Saada kommentaar
          </button>
        </form>
      </div>
    </div>
  );
}