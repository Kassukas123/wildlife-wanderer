"use client";

import { SearchComponent } from "./SearchComponent";

interface FilterProps {
  filters: {
    parking: boolean | null;
    camping: boolean | null;
    campfire: boolean | null;
    length: string | null;
    type: string | null;
    accessibility: string | null;
    county: string | null;
  };
  onFilterChange: (newFilters: {
    parking: boolean | null;
    camping: boolean | null;
    campfire: boolean | null;
    length: string | null;
    type: string | null;
    accessibility: string | null;
    county: string | null;
  }) => void;
  onApplyFilters: () => void;
  onSearch: (query: string) => void;
}

export default function FilterComponent({
  filters,
  onFilterChange,
  onApplyFilters,
  onSearch,
}: FilterProps) {
  return (
    <div className="w-1/5 bg-gray-100 p-4">
      <SearchComponent onSearch={onSearch} />

      <div className="mb-4">
        <label className="block mb-2">Raja pikkus:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={filters.length || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, length: e.target.value || null })
          }
        >
          <option value="">Kõik</option>
          <option value="0-2">0-2 km</option>
          <option value="2-5">2-5 km</option>
          <option value="5-10">5-10 km</option>
          <option value="10+">Üle 10 km</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Raja tüüp:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={filters.type ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              type: e.target.value === "" ? null : e.target.value,
            })
          }
        >
          <option value="">Kõik</option>
          <option value="Õpperada">Õpperada</option>
          <option value="Matkarada">Matkarada</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Maakond:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={filters.county ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              county: e.target.value === "" ? null : e.target.value,
            })
          }
        >
          <option value="">Kõik</option>
          <option value="Hiiu maakond">Hiiu maakond</option>
          <option value="Saare maakond">Saare maakond</option>
          <option value="Lääne maakond">Lääne maakond</option>
          <option value="Pärnu maakond">Pärnu maakond</option>
          <option value="Harju maakond">Harju maakond</option>
          <option value="Rapla maakond">Rapla maakond</option>
          <option value="Järva maakond">Järva maakond</option>
          <option value="Viljandi maakond">Viljandi maakond</option>
          <option value="Jõgeva maakond">Jõgeva maakond</option>
          <option value="Lääne-Viru maakond">Lääne-Viru maakond</option>
          <option value="Ida-Viru maakond">Ida-Viru maakond</option>
          <option value="Tartu maakond">Tartu maakond</option>
          <option value="Valga maakond">Valga maakond</option>
          <option value="Põlva maakond">Põlva maakond</option>
          <option value="Võru maakond">Võru maakond</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Ligipääsetavus:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={filters.accessibility === null ? "" : filters.accessibility}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              accessibility: e.target.value === "" ? null : e.target.value,
            })
          }
        >
          <option value="">Kõik</option>
          <option value="Jalgsi">Jalgsi</option>
          <option value="Jalgsi, jalgrattaga">Jalgsi, jalgrattaga</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Parkimine:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={filters.parking === null ? "" : filters.parking.toString()}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              parking: e.target.value === "" ? null : e.target.value === "true",
            })
          }
        >
          <option value="">Kõik</option>
          <option value="true">Jah</option>
          <option value="false">Ei</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Telkimine:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={filters.camping === null ? "" : filters.camping.toString()}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              camping: e.target.value === "" ? null : e.target.value === "true",
            })
          }
        >
          <option value="">Kõik</option>
          <option value="true">Jah</option>
          <option value="false">Ei</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Lõkke tegemine:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={filters.campfire === null ? "" : filters.campfire.toString()}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              campfire:
                e.target.value === "" ? null : e.target.value === "true",
            })
          }
        >
          <option value="">Kõik</option>
          <option value="true">Jah</option>
          <option value="false">Ei</option>
        </select>
      </div>

      <button
        onClick={onApplyFilters}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Rakenda filtreid
      </button>

      <div className="mb-4">
        <button
          onClick={() =>
            onFilterChange({
              parking: null,
              camping: null,
              campfire: null,
              length: null,
              type: null,
              accessibility: null,
              county: null,
            })
          }
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Eemalda filtrid
        </button>
      </div>
    </div>
  );
}
