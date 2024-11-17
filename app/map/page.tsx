import { MapComponent } from "../../components/map/MapComponent";

export default function Map() {
    return (
        <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
            <h1>Kaart</h1>
            <MapComponent />
        </div>
    );
}
