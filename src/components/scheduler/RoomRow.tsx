import type { Room } from "@/data/schedulerTypes";
import { cn } from "@/lib/utils";

interface RoomRowProps {
  room: Room;
  children: React.ReactNode;
  className?: string;
}

export function RoomRow({ room, children, className }: RoomRowProps) {
  return (
    <div
      className={cn(
        "flex min-h-[80px] border-b last:border-b-0 even:bg-muted/10",
        className
      )}
    >
      {/* Room label - fixed width, horizontally scrollable if content overflows */}
      <div className="sticky left-0 z-10 flex w-[160px] shrink-0 items-center gap-1 overflow-x-auto overflow-y-hidden border-r bg-muted/30 px-2 py-3 [&::-webkit-scrollbar]:h-1">
        <span className="whitespace-nowrap text-xs font-semibold">{room.code}</span>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          ({room.capacity})
        </span>
      </div>
      {/* Cells */}
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
