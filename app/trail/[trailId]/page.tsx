"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default async function TrailPage({
  params,
}: {
  params: { trailId: string };
}) {
  const supabase = createClient();
  const { data: trail, error } = await supabase
    .from("Trails")
    .select(
      "id, name, length, type, parking, camping, campfire, accessibility, county, berries_mushrooms, sightseeing, picture"
    )
    .eq("id", params.trailId)
    .single();

  if (error) {
    console.error("Failed to fetch trail:", error);
    return <div>Rada ei õnnestunud laadida.</div>;
  }

  if (!trail) {
    return <div>Rada ei leitud.</div>;
  }

  return <TrailContent trail={trail} />;
}

function TrailContent({ trail }: { trail: any }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.from("Comments").insert({
      trail_id: trail.id,
      user_id: "current-user-id",
      comment,
    });

    if (error) {
      console.error("Failed to submit comment:", error);
      alert("Kommentaari salvestamine ebaõnnestus.");
    } else {
      alert("Kommentaar salvestatud!");
      setComment("");
    }

    setIsSubmitting(false);
  };

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
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Lisa kommentaar"
          rows={4}
          className="w-full border rounded p-2"
        />
        <button
          onClick={handleCommentSubmit}
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
          {isSubmitting ? "Salvestan..." : "Lisa kommentaar"}
        </button>
      </div>
    </div>
  );
}
