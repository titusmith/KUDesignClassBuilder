import { useState, useMemo } from "react";
import type { ScheduleAssignment, Room, TimeBlock } from "@/data/schedulerTypes";
import { roomInventory } from "@/data/roomInventory";
import { timeBlocks } from "@/data/timeBlocks";
import { courseRegistry } from "@/data/courseRegistry";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface PendingPlacement {
  courseId: string;
  instructorId: string;
}

interface FindRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignments: ScheduleAssignment[];
  pendingPlacement?: PendingPlacement | null;
  onSelectRoom?: (roomId: string, timeBlockId: string) => void;
}

const BUILDINGS = [...new Set(roomInventory.map((r) => r.building))].sort();
const CATEGORIES = ["large", "studio", "small"] as const;

export function FindRoomModal({
  open,
  onOpenChange,
  assignments,
  pendingPlacement,
  onSelectRoom,
}: FindRoomModalProps) {
  const [selectedTimeBlockId, setSelectedTimeBlockId] = useState<string>("");
  const [selectedBuilding, setSelectedBuilding] = useState<string>("all");
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const pendingCourse = pendingPlacement
    ? courseRegistry.find((c) => c.id === pendingPlacement.courseId)
    : undefined;

  const getAssignmentForSlot = (roomId: string, timeBlockId: string) =>
    assignments.find(
      (a) => a.roomId === roomId && a.timeBlockId === timeBlockId && !a.isShadow
    );

  const isInstructorBusyAtTime = (timeBlockId: string) =>
    !!pendingPlacement &&
    assignments.some(
      (a) =>
        !a.isShadow &&
        a.timeBlockId === timeBlockId &&
        a.instructorId === pendingPlacement.instructorId
    );

  const availableSlots = useMemo(() => {
    const slots: { room: Room; timeBlock: TimeBlock }[] = [];
    const timeBlockIds = selectedTimeBlockId
      ? [selectedTimeBlockId]
      : timeBlocks.map((tb) => tb.id);

    for (const room of roomInventory) {
      if (selectedBuilding !== "all" && room.building !== selectedBuilding) continue;
      if (minCapacity > 0 && room.capacity < minCapacity) continue;
      if (selectedCategory !== "all" && room.category !== selectedCategory) continue;

      for (const timeBlockId of timeBlockIds) {
        const timeBlock = timeBlocks.find((tb) => tb.id === timeBlockId);
        if (!timeBlock) continue;
        if (getAssignmentForSlot(room.id, timeBlockId)) continue;
        if (pendingPlacement && isInstructorBusyAtTime(timeBlockId)) continue;
        slots.push({ room, timeBlock });
      }
    }

    return slots.sort((a, b) => {
      if (a.room.building !== b.room.building) return a.room.building.localeCompare(b.room.building);
      return b.room.capacity - a.room.capacity;
    });
  }, [
    assignments,
    pendingPlacement,
    selectedTimeBlockId,
    selectedBuilding,
    minCapacity,
    selectedCategory,
  ]);

  const handlePlaceHere = (roomId: string, timeBlockId: string) => {
    onSelectRoom?.(roomId, timeBlockId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] flex flex-col bg-white dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>
            {pendingCourse ? `Rooms for ${pendingCourse.code}` : "Find a room"}
          </DialogTitle>
          <DialogDescription>
            {pendingCourse
              ? "Showing rooms available for placement. Filter by time block, building, or capacity."
              : "Filter by time block, building, or capacity to find available rooms."}
          </DialogDescription>
        </DialogHeader>

        {/* Smart recommendations - structure for future heuristic-based recs */}
        {pendingCourse && (
          <div className="rounded-md border border-dashed border-muted-foreground/30 bg-muted/20 p-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Recommended for you
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Smart recommendations will appear here once we have course size, historical
              assignments, and room fit data.
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Time block</label>
            <Select
              value={selectedTimeBlockId || "all"}
              onValueChange={(v) => setSelectedTimeBlockId(v === "all" ? "" : v)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {timeBlocks.map((tb) => (
                  <SelectItem key={tb.id} value={tb.id}>
                    {tb.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Building</label>
            <Select
              value={selectedBuilding}
              onValueChange={setSelectedBuilding}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {BUILDINGS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Min capacity</label>
            <Select
              value={minCapacity.toString()}
              onValueChange={(v) => setMinCapacity(parseInt(v, 10))}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any</SelectItem>
                {[20, 30, 48, 60, 100, 120].map((c) => (
                  <SelectItem key={c} value={c.toString()}>
                    {c}+
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 min-h-0 flex flex-col">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Available rooms ({availableSlots.length})
          </h4>
          <ScrollArea className="flex-1 max-h-[280px] rounded-md border">
            <div className="p-2 space-y-1">
              {availableSlots.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No rooms match your filters. Try adjusting the time block or building.
                </p>
              ) : (
                availableSlots.map(({ room, timeBlock }) => (
                  <div
                    key={`${room.id}-${timeBlock.id}`}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm",
                      onSelectRoom && pendingPlacement
                        ? "cursor-pointer hover:bg-muted/50"
                        : ""
                    )}
                  >
                    <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1">
                      <span className="whitespace-nowrap font-medium">{room.code}</span>
                      <span className="whitespace-nowrap text-muted-foreground"> ({room.capacity})</span>
                      <span className="whitespace-nowrap text-muted-foreground"> · {room.building}</span>
                      <span className="whitespace-nowrap text-muted-foreground"> · {timeBlock.label}</span>
                    </div>
                    {onSelectRoom && pendingPlacement && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="shrink-0"
                        onClick={() => handlePlaceHere(room.id, timeBlock.id)}
                      >
                        Place here
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
