import { Loader2 } from "lucide-react";

type Props = {
  message?: string;
  size?: "sm" | "md" | "lg";
};

export default function LoadingSpinner({
  message = "Loading weather data...",
  size = "lg",
}: Props) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="text-center py-12">
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-white mx-auto mb-4`}
      />
      <p className="text-white/80 text-lg">{message}</p>
    </div>
  );
}
