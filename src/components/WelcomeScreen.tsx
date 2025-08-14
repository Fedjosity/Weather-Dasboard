import { Sun } from "lucide-react";

export default function WelcomeScreen() {
  return (
    <div className="lg:col-span-3 flex flex-col items-center justify-center text-center py-20">
      <Sun className="h-28 w-28 text-yellow-300 mb-6 drop-shadow-lg" />
      <h3 className="text-4xl font-extrabold text-white mb-4">
        Welcome to Weather Dashboard
      </h3>
      <p className="text-lg md:text-xl text-white/80 font-medium mb-8 max-w-2xl leading-relaxed">
        Search for a city or use your location to get started with
        <span className="font-bold"> real-time weather information</span>.
      </p>
      <div className="space-y-3 text-lg text-white/70 font-semibold">
        <p>• Current temperature & conditions</p>
        <p>• 5-day weather forecast</p>
        <p>• Temperature trend charts</p>
        <p>• Humidity & wind data</p>
      </div>
    </div>
  );
}
