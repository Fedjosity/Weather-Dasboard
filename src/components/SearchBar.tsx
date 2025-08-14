import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  onSearch: (city: string) => void;
  onUseLocation?: () => void;
  loading?: boolean;
};

export default function SearchBar({ onSearch, onUseLocation, loading }: Props) {
  const [city, setCity] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={submit} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="pl-10 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300"
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Get Weather"
          )}
        </Button>
        {onUseLocation && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onUseLocation}
            title="Use my location"
            className="h-12 px-4 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            disabled={loading}
          >
            <MapPin className="h-5 w-5" />
          </Button>
        )}
      </form>
    </div>
  );
}
