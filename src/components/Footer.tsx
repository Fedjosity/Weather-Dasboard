import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="mt-16 text-center">
      <div className="glass rounded-2xl p-6 max-w-md mx-auto">
        <p className="text-white/70 mb-2">
          Built with React & OpenWeatherMap API
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
            asChild
          >
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
          <span className="text-white/40">•</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
            asChild
          >
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noreferrer"
            >
              OpenWeatherMap
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
