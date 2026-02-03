import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface FindRoomFabProps {
  onClick: () => void;
  className?: string;
}

export function FindRoomFab({ onClick, className }: FindRoomFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Find me a room"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-black bg-white shadow-lg transition-colors hover:bg-gray-50",
        className
      )}
    >
      <MapPin className="h-5 w-5" />
    </button>
  );
}
