'use client'

export function FilterComponent() {
    return (
        <div className="w-1/5 bg-gray-100 p-4">
            <h2 className="text-lg font-bold mb-4">Filtrid</h2>
            <label className="block mb-2">
                Otsing:
                <input
                    type="text"
                    className="border border-gray-300 rounded p-2 w-full mt-1"
                    placeholder="Sisesta otsing..."
                />
            </label>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Rakenda filtreid
            </button>
        </div>
    );
}
