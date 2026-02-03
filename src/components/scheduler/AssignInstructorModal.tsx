import type { Room, TimeBlock, Course, ScheduleAssignment } from "@/data/schedulerTypes";
import { facultyRoster } from "@/data/facultyRoster";
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
import { useMemo, useCallback } from "react";

export interface PendingInstructorAssignment {
  room: Room;
  timeBlock: TimeBlock;
  course: Course;
}

interface AssignInstructorModalProps {
  pending: PendingInstructorAssignment | null;
  open: boolean;
  assignments: ScheduleAssignment[];
  onOpenChange: (open: boolean) => void;
  onResolve: (instructorId: string) => void;
}

export function AssignInstructorModal({
  pending,
  open,
  assignments,
  onOpenChange,
  onResolve,
}: AssignInstructorModalProps) {
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
      if (!pending) return false;
      return assignments.some(
        (a) =>
          !a.isShadow &&
          a.timeBlockId === pending.timeBlock.id &&
          a.instructorId === instructorId
      );
    },
    [assignments, pending]
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

  const handleSelect = useCallback(
    (instructorId: string) => {
      onResolve(instructorId);
      onOpenChange(false);
    },
    [onResolve, onOpenChange]
  );

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!pending) return null;

  const { room, timeBlock, course } = pending;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign instructor</DialogTitle>
          <DialogDescription>
            {course.code} was dropped at {room.code} during {timeBlock.label}. Select an
            instructor to place it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm font-medium">Select instructor for {course.code}</p>
          <InstructorCombobox
            instructors={facultyRoster}
            onSelect={handleSelect}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
