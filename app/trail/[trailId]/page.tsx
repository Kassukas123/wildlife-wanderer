import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function TrailPage({
  params,
}: {
  params: { trailId: string };
}) {
  const { data: trail, error } = await supabase
    .from("Trails")
    .select("id, name, length, type")
    .eq("id", params.trailId)
    .single();

  if (error) {
    console.error("Failed to fetch trail:", error);
    return <div>Raja andmeid ei õnnestunud laadida.</div>;
  }

  if (!trail) {
    return <div>Rada ei leitud.</div>;
  }

  return (
    <div>
      <h1>{trail.name}</h1>
      <p>Pikkus: {trail.length} km</p>
      <p>Tüüp: {trail.type}</p>
    </div>
  );
}
