"use client";

import { useEffect, useState } from 'react';
import { Trail } from '@/types/trail';

export default function TrailComponent() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch('/api/trails');
        if (!response.ok) throw new Error('Failed to fetch trails');
        const data: Trail[] = await response.json();
        setTrails(data);
      } catch (error) {
        setError('Failed to load trails');
      } finally {
        setLoading(false);
      }
    }

    fetchTrails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Trails</h1>
      <ul>
        {trails.map((trail) => (
          <li key={trail.id}>
            <h2>{trail.name}</h2>
            <p>Type: {trail.type}</p>
            <p>Location: {trail.location}</p>
            <p>Accessibility: {trail.accessibility}</p>
            <p>{trail.parking ? 'Has parking' : 'No parking'}</p>
            <p>{trail.camping ? 'Camping allowed' : 'No camping'}</p>
            <p>{trail.berries_mushrooms ? 'Good for picking berries/mushrooms' : 'Not for picking berries/mushrooms'}</p>
            <p>{trail.sightseeing ? 'Has sightseeing opportunities' : 'No sightseeing'}</p>
            <p>Coordinates: ({trail.xCoordinate}, {trail.yCoordinate})</p>
            {trail.picture && <img src={trail.picture} alt={trail.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
