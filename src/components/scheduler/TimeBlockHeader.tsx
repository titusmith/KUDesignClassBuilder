import type { TimeBlock } from "@/data/schedulerTypes";
import { cn } from "@/lib/utils";

const DAY_PATTERN_LABELS: Record<string, string> = {
  MW: "M/W",
  TTh: "T/Th",
  Evening: "Evening",
};

interface TimeBlockHeaderProps {
  timeBlocks: TimeBlock[];
  className?: string;
  dimmedTimeBlockIds?: Set<string>;
}

export function TimeBlockHeader({
  timeBlocks,
  className,
  dimmedTimeBlockIds,
}: TimeBlockHeaderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 border-b bg-muted/80 backdrop-blur-sm",
        className
      )}
    >
      {/* Corner cell for room column - fixed width to match room rows */}
      <div className="sticky left-0 z-30 flex w-[160px] shrink-0 items-center gap-1 border-r bg-muted px-2 py-3 text-xs font-medium">
        <span>Room</span>
        <span className="shrink-0 text-xs font-normal text-muted-foreground">(cap)</span>
      </div>
      <div className="flex flex-1">
        {timeBlocks.map((tb) => (
          <div
            key={tb.id}
            className={cn(
              "flex min-w-[160px] flex-1 flex-col items-center justify-center gap-0.5 border-r px-2 py-3 text-center last:border-r-0",
              dimmedTimeBlockIds?.has(tb.id) && "opacity-30"
            )}
          >
            <span className="text-xs font-semibold">
              {DAY_PATTERN_LABELS[tb.dayPattern] ?? tb.dayPattern}
            </span>
            <span className="text-xs text-muted-foreground">
              {tb.start}–{tb.end}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
