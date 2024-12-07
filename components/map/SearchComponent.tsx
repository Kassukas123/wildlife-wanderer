"use client";

import { useState } from "react";

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

export function SearchComponent({ onSearch }: SearchComponentProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); 
    setQuery("");
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Otsi raja nime järgi..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded p-2 flex-grow mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Otsi
      </button>
    </div>
  );
}
