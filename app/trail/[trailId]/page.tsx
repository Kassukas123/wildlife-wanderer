import { createClient } from "@/utils/supabase/client";

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
    </div>
  );
}
