import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

type Props = {
  onSearch: (city: string) => void;
  onUseLocation?: () => void;
};

export default function SearchBar({ onSearch, onUseLocation }: Props) {
  const [city, setCity] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl mx-auto gap-2">
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="w-full rounded-xl pl-10 pr-4 py-3 bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-3 rounded-xl bg-white/20 text-white hover:bg-white/30 transition"
      >
        Get Weather
      </button>
      {onUseLocation && (
        <button
          type="button"
          onClick={onUseLocation}
          title="Use my location"
          className="px-3 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
        >
          <FiMapPin />
        </button>
      )}
    </form>
  );
}
