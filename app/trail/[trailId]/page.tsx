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
  const [comments, setComments] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchComments = async () => {
    if (!trailId) return;

    const { data: comments, error } = await supabase
      .from("Comments")
      .select("id, comment, created_at, Users(username)")
      .eq("trail_id", trailId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Kommentaare ei õnnestunud laadida:", error.message);
    } else {
      setComments(comments || []);
    }
  };

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
    fetchComments();
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
        await fetchComments();
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
    <div className="min-h-screen overflow-y-auto bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">{trail.name}</h1>
        {trail.picture && (
          <img
            src={trail.picture}
            alt={trail.name}
            className="w-full max-w-lg mx-auto my-4 rounded-lg shadow-md"
          />
        )}
        <ul className="space-y-2 text-gray-700">
          <li><strong>Pikkus:</strong> {trail.length} km</li>
          <li><strong>Tüüp:</strong> {trail.type}</li>
          <li><strong>Parkimine:</strong> {trail.parking ? "olemas" : "puudub"}</li>
          <li><strong>Telkimine:</strong> {trail.camping ? "olemas" : "puudub"}</li>
          <li><strong>Lõkke tegemine:</strong> {trail.campfire ? "olemas" : "puudub"}</li>
          <li><strong>Ligipääsetavus:</strong> {trail.accessibility}</li>
          <li><strong>Maakond:</strong> {trail.county}</li>
          <li><strong>Korilus:</strong> {trail.berries_mushrooms === "puudub" || !trail.berries_mushrooms ? "info puudub" : trail.berries_mushrooms}</li>
          <li><strong>Vaatamisväärsused:</strong> {trail.sightseeing}</li>
        </ul>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-gray-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4 text-blue-600">Kommentaarid</h2>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="p-4 bg-white rounded-lg shadow">
                <p className="text-sm text-gray-600">{new Date(comment.created_at).toLocaleString("et-EE")}</p>
                <p className="mt-2 text-gray-800"><strong>{comment.Users.username}</strong>: {comment.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ühtegi kommentaari pole lisatud.</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4 text-blue-600">Lisa kommentaar</h2>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Sisesta oma kommentaar"
            className="w-full border rounded p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow"
          >
            Saada kommentaar
          </button>
        </form>
      </div>
    </div>
  );
}