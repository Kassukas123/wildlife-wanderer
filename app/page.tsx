import { MapComponent } from "@/components/map/MapComponent";

export default async function Index() {
  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <MapComponent />
    </div>
  );
}
