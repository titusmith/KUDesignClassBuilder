import type { Conflict, ScheduleAssignment } from "@/data/schedulerTypes";
import { facultyRoster } from "@/data/facultyRoster";
import { roomInventory } from "@/data/roomInventory";
import { MAX_INSTRUCTOR_LOAD } from "@/data/schedulerConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InstructorCombobox } from "./InstructorCombobox";
import { useMemo, useState, useCallback, useEffect } from "react";

interface InstructorConflictModalProps {
  conflict: Conflict | null;
  open: boolean;
  assignments: ScheduleAssignment[];
  onOpenChange: (open: boolean) => void;
  onResolve: (instructorId: string) => void;
}

export function InstructorConflictModal({
  conflict,
  open,
  assignments,
  onOpenChange,
  onResolve,
}: InstructorConflictModalProps) {
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedInstructorId(null);
    }
  }, [open]);

  const instructorWorkload = useMemo(() => {
    const counts: Record<string, number> = {};
    facultyRoster.forEach((f) => {
      counts[f.id] = 0;
    });
    assignments
      .filter((a) => !a.isShadow)
      .forEach((a) => {
        counts[a.instructorId] = (counts[a.instructorId] ?? 0) + 1;
      });
    return counts;
  }, [assignments]);

  const isInstructorBusyAtTime = useCallback(
    (instructorId: string) => {
      if (!conflict) return false;
      return assignments.some(
        (a) =>
          !a.isShadow &&
          a.timeBlockId === conflict.timeBlock.id &&
          a.instructorId === instructorId &&
          a.id !== conflict.movingAssignmentId
      );
    },
    [assignments, conflict]
  );

  const isInstructorAtCapacity = useCallback(
    (instructorId: string) => {
      const count = instructorWorkload[instructorId] ?? 0;
      return count >= MAX_INSTRUCTOR_LOAD;
    },
    [instructorWorkload]
  );

  const isInstructorDisabled = useCallback(
    (instructorId: string) =>
      isInstructorAtCapacity(instructorId) || isInstructorBusyAtTime(instructorId),
    [isInstructorAtCapacity, isInstructorBusyAtTime]
  );

  const getDisabledMessage = useCallback(
    (instructorId: string) => {
      if (isInstructorBusyAtTime(instructorId)) {
        return " (already teaching at this time)";
      }
      if (isInstructorAtCapacity(instructorId)) {
        return ` (${instructorWorkload[instructorId] ?? 0}/${MAX_INSTRUCTOR_LOAD} at capacity)`;
      }
      return undefined;
    },
    [isInstructorBusyAtTime, isInstructorAtCapacity, instructorWorkload]
  );

  const handlePlace = useCallback(() => {
    if (selectedInstructorId) {
      onResolve(selectedInstructorId);
      onOpenChange(false);
    }
  }, [selectedInstructorId, onResolve, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!conflict || conflict.type !== "instructor") return null;

  const { existingInstructor, existingCourse, proposedCourse, room, timeBlock } = conflict;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Instructor Double-Booked</DialogTitle>
          <DialogDescription>
            <span className="font-semibold">{existingInstructor?.name}</span> is already teaching {existingCourse?.code} at{" "}
            {existingAssignmentRoomCode(conflict)} during {timeBlock.label}. Pick a different
            instructor to place {proposedCourse.code} at {room.code}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm font-medium">Select instructor for {proposedCourse.code}</p>
          {selectedInstructorId && (
            <p className="text-xs text-muted-foreground">
              Selected: {facultyRoster.find((f) => f.id === selectedInstructorId)?.name}
            </p>
          )}
          <InstructorCombobox
            instructors={facultyRoster}
            value={selectedInstructorId ?? undefined}
            onSelect={(id) => setSelectedInstructorId(id)}
            isInstructorAtCapacity={isInstructorDisabled}
            instructorWorkload={instructorWorkload}
            maxLoad={MAX_INSTRUCTOR_LOAD}
            placeholder="Type to search..."
            getDisabledMessage={getDisabledMessage}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handlePlace} disabled={!selectedInstructorId}>
            Place with selected instructor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function existingAssignmentRoomCode(conflict: Conflict): string {
  const roomId = conflict.existingAssignment?.roomId;
  if (!roomId) return "another room";
  const room = roomInventory.find((r) => r.id === roomId);
  return room?.code ?? "another room";
}
