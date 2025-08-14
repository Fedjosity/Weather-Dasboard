import { Cloud } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-white/10 rounded-full">
          <Cloud className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Weather Dashboard
        </h1>
      </div>
      <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
        Get real-time weather updates, forecasts, and temperature trends for any
        location
      </p>
    </header>
  );
}
