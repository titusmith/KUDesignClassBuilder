import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Room,
  TimeBlock,
  ScheduleAssignment,
  Course,
  Faculty,
  DayPattern,
} from "@/data/schedulerTypes";
import type { PendingInstructorAssignment } from "./AssignInstructorModal";
import { roomInventory } from "@/data/roomInventory";
import { timeBlocks } from "@/data/timeBlocks";
import { courseRegistry } from "@/data/courseRegistry";
import { facultyRoster } from "@/data/facultyRoster";
import { linkedRooms } from "@/data/linkedRooms";
import { MAX_INSTRUCTOR_LOAD } from "@/data/schedulerConfig";
import { TimeBlockHeader } from "./TimeBlockHeader";
import { RoomRow } from "./RoomRow";
import { ScheduleCell } from "./ScheduleCell";
import { LinkedRoomSuggestion } from "./LinkedRoomSuggestion";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface PendingPlacement {
  courseId: string;
  instructorId: string;
}

interface ScheduleGridProps {
  assignments: ScheduleAssignment[];
  courseInstructorPreassignments: Record<string, string>;
  onAssignmentsChange: (assignments: ScheduleAssignment[]) => void;
  onCourseScheduled?: (courseId: string) => void;
  onPendingInstructorAssignment?: (pending: PendingInstructorAssignment) => void;
  onConflict?: (conflict: {
    type: "room" | "time" | "both" | "instructor";
    room: Room;
    timeBlock: TimeBlock;
    existingAssignment?: ScheduleAssignment;
    proposedCourse: Course;
    proposedInstructor?: Faculty;
    /** When instructor conflict from a move, ID of the assignment being moved */
    movingAssignmentId?: string;
  }) => void;
  /** When set, grid enters placement mode - click empty cells to place */
  pendingPlacement?: PendingPlacement | null;
  onPlacementCancel?: () => void;
  onPlaceCourse?: (courseId: string, instructorId: string, roomId: string, timeBlockId: string) => void;
  dayPatternFilter: "all" | DayPattern;
  onDayPatternFilterChange: (value: "all" | DayPattern) => void;
  prefixFilter: string[];
  onPrefixFilterChange: (prefixes: string[]) => void;
  prefixOptions: string[];
  focusModeEnabled: boolean;
  instructorFilter: string[];
}

// Order: Chalmers, Marvin, CDR, Wescoe, Sum, LEEP, KS-ST, Snow. Room number in order within building.
const BUILDING_ORDER = ["CHAL", "MAR", "CDR", "WES", "SUM", "LEEP2", "KS-ST", "SNOW"] as const;

// Mapping from focus mode "Programs" options to underlying course prefixes
// VISC & IXD programs: VISC, IXD, BDS, ADS
// INDD program: VISC, BDS, ADS
// ILLU & ANIM programs: ILLU, ANIM, BDS, ADS
const PROGRAM_TO_PREFIXES: Record<string, string[]> = {
  VISC: ["VISC", "IXD", "BDS", "ADS"],
  IXD: ["VISC", "IXD", "BDS", "ADS"],
  INDD: ["VISC", "BDS", "ADS"],
  ILLU: ["ILLU", "ANIM", "BDS", "ADS"],
  ANIM: ["ILLU", "ANIM", "BDS", "ADS"],
};

function parseRoomNumber(code: string): string {
  const parts = code.split(/\s+/);
  return parts[parts.length - 1] ?? "";
}

function sortRooms(rooms: Room[]): Room[] {
  return [...rooms].sort((a, b) => {
    const buildingA = BUILDING_ORDER.indexOf(a.building);
    const buildingB = BUILDING_ORDER.indexOf(b.building);
    if (buildingA !== buildingB) return buildingA - buildingB;
    const numA = parseRoomNumber(a.code);
    const numB = parseRoomNumber(b.code);
    return numA.localeCompare(numB, undefined, { numeric: true });
  });
}

interface PendingLinkedRoom {
  primaryAssignmentId: string;
  primaryRoomCode: string;
  pairedRoomId: string;
  pairedRoomCode: string;
  timeBlockId: string;
  courseId: string;
  instructorId: string;
}

export function ScheduleGrid({
  assignments,
  courseInstructorPreassignments,
  onAssignmentsChange,
  onCourseScheduled,
  onPendingInstructorAssignment,
  onConflict,
  pendingPlacement,
  onPlacementCancel,
  onPlaceCourse,
  dayPatternFilter,
  onDayPatternFilterChange,
  prefixFilter,
  onPrefixFilterChange,
  prefixOptions,
  focusModeEnabled,
  instructorFilter,
}: ScheduleGridProps) {
  const sortedRooms = useMemo(() => sortRooms(roomInventory), []);
  const [pendingLinkedRoom, setPendingLinkedRoom] = useState<PendingLinkedRoom | null>(null);
  const inactiveTimeBlockIds = useMemo(() => {
    if (!focusModeEnabled || dayPatternFilter === "all") return new Set<string>();
    return new Set(
      timeBlocks.filter((tb) => tb.dayPattern !== dayPatternFilter).map((tb) => tb.id)
    );
  }, [focusModeEnabled, dayPatternFilter]);
  const instructorFilterSet = useMemo(() => new Set(instructorFilter), [instructorFilter]);
  const shouldFilterByPrefix =
    focusModeEnabled &&
    prefixFilter.length > 0 &&
    prefixFilter.length !== prefixOptions.length;
  const shouldFilterByInstructor =
    focusModeEnabled &&
    instructorFilter.length > 0 &&
    instructorFilter.length !== facultyRoster.length;

  useEffect(() => {
    if (!pendingPlacement) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onPlacementCancel?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pendingPlacement, onPlacementCancel]);

  const getAssignmentForSlot = useCallback(
    (roomId: string, timeBlockId: string) =>
      assignments.find(
        (a) => a.roomId === roomId && a.timeBlockId === timeBlockId && !a.isShadow
      ),
    [assignments]
  );

  const getCourse = useCallback((courseId: string) =>
    courseRegistry.find((c) => c.id === courseId),
    []);

  const getInstructor = useCallback((instructorId: string) =>
    facultyRoster.find((f) => f.id === instructorId),
    []);

  const getLinkedRoomCode = useCallback((roomCode: string) => {
    const paired = linkedRooms[roomCode];
    return paired?.[0];
  }, []);

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

  const handleDrop = useCallback(
    (roomId: string, timeBlockId: string, courseId: string, assignmentId?: string) => {
      const room = roomInventory.find((r) => r.id === roomId);
      const existingAssignment = getAssignmentForSlot(roomId, timeBlockId);
      const course = getCourse(courseId);
      if (!course || !room) return;

      const isMove = !!assignmentId;
      const movingAssignment = isMove
        ? assignments.find((a) => a.id === assignmentId && !a.isShadow)
        : undefined;

      // Same cell - no-op
      if (
        isMove &&
        movingAssignment &&
        movingAssignment.roomId === roomId &&
        movingAssignment.timeBlockId === timeBlockId
      ) {
        return;
      }

      const timeBlock = timeBlocks.find((tb) => tb.id === timeBlockId)!;

      // Check instructor double-booking: proposed instructor already teaching at this time in a different room
      const proposedInstructorId = isMove
        ? movingAssignment!.instructorId
        : courseInstructorPreassignments[courseId] ||
          course.instructorId ||
          facultyRoster[0]?.id ||
          "";
      const instructorConflictAssignment = assignments.find(
        (a) =>
          !a.isShadow &&
          a.timeBlockId === timeBlockId &&
          a.instructorId === proposedInstructorId &&
          a.roomId !== roomId &&
          (!isMove || a.id !== assignmentId)
      );
      if (instructorConflictAssignment && onConflict) {
        const existingCourse = getCourse(instructorConflictAssignment.courseId);
        const existingInstructor = getInstructor(instructorConflictAssignment.instructorId);
        const proposedInstructor = getInstructor(proposedInstructorId);
        onConflict({
          type: "instructor",
          room,
          timeBlock,
          existingAssignment: instructorConflictAssignment,
          existingCourse,
          existingInstructor,
          proposedCourse: course,
          proposedInstructor,
          movingAssignmentId: isMove ? assignmentId : undefined,
        });
        return;
      }

      // Check room/time clash (skip if we're moving and target is ourselves - shouldn't happen)
      const clashWithOther =
        existingAssignment &&
        (!isMove || existingAssignment.id !== assignmentId);
      if (clashWithOther && onConflict) {
        const existingCourse = getCourse(existingAssignment.courseId);
        const existingInstructor = getInstructor(existingAssignment.instructorId);
        onConflict({
          type: "both",
          room,
          timeBlock,
          existingAssignment,
          existingCourse,
          existingInstructor,
          proposedCourse: course,
        });
        return;
      }

      if (isMove && movingAssignment) {
        // Move: update existing assignment, preserve instructor
        const updated = assignments.map((a) => {
          if (a.id === assignmentId) {
            return { ...a, roomId, timeBlockId };
          }
          // Update linked shadow if it points to this primary
          if (a.isShadow && a.linkedRoomId === movingAssignment.roomId) {
            const primaryRoom = roomInventory.find((r) => r.id === a.linkedRoomId);
            const primaryAtSameTime = assignments.find(
              (p) =>
                p.roomId === primaryRoom?.id &&
                p.timeBlockId === a.timeBlockId &&
                !p.isShadow
            );
            if (primaryAtSameTime?.id === assignmentId) {
              // Remove shadow - it was linked to old slot, we're moving the primary
              return null;
            }
          }
          return a;
        }).filter(Boolean) as ScheduleAssignment[];

        // Remove shadows linked to the old primary slot
        const withoutOldShadows = updated.filter(
          (a) =>
            !(
              a.isShadow &&
              a.linkedRoomId === movingAssignment.roomId &&
              a.timeBlockId === movingAssignment.timeBlockId
            )
        );

        onAssignmentsChange(withoutOldShadows);

        // Check for linked room suggestion at new slot
        const pairedRoomCodes = linkedRooms[room.code];
        if (pairedRoomCodes?.length) {
          const pairedRoom = roomInventory.find((r) => r.code === pairedRoomCodes[0]);
          const pairedSlotOccupied = pairedRoom && getAssignmentForSlot(pairedRoom.id, timeBlockId);
          if (pairedRoom && !pairedSlotOccupied) {
            setPendingLinkedRoom({
              primaryAssignmentId: assignmentId,
              primaryRoomCode: room.code,
              pairedRoomId: pairedRoom.id,
              pairedRoomCode: pairedRoom.code,
              timeBlockId,
              courseId,
              instructorId: movingAssignment.instructorId,
            });
          }
        }
        return;
      }

      // New assignment from sidebar
      const hasPreassignedInstructor =
        !!courseInstructorPreassignments[courseId] || !!course.instructorId;

      if (!hasPreassignedInstructor && onPendingInstructorAssignment) {
        onPendingInstructorAssignment({ room, timeBlock, course });
        return;
      }

      const instructorId =
        courseInstructorPreassignments[courseId] ||
        course.instructorId ||
        facultyRoster[0]?.id ||
        "";
      const newAssignment: ScheduleAssignment = {
        id: `assign-${Date.now()}-${roomId}-${timeBlockId}`,
        courseId,
        roomId,
        timeBlockId,
        instructorId,
      };

      onAssignmentsChange([...assignments, newAssignment]);
      onCourseScheduled?.(courseId);

      // Check for linked room suggestion
      const pairedRoomCodes = linkedRooms[room.code];
      if (pairedRoomCodes?.length) {
        const pairedRoom = roomInventory.find((r) => r.code === pairedRoomCodes[0]);
        const pairedSlotOccupied = pairedRoom && getAssignmentForSlot(pairedRoom.id, timeBlockId);
        if (pairedRoom && !pairedSlotOccupied) {
          setPendingLinkedRoom({
            primaryAssignmentId: newAssignment.id,
            primaryRoomCode: room.code,
            pairedRoomId: pairedRoom.id,
            pairedRoomCode: pairedRoom.code,
            timeBlockId,
            courseId,
            instructorId,
          });
        }
      }
    },
    [
      assignments,
      courseInstructorPreassignments,
      getAssignmentForSlot,
      getCourse,
      getInstructor,
      onAssignmentsChange,
      onCourseScheduled,
      onConflict,
      onPendingInstructorAssignment,
    ]
  );

  const handleLinkedRoomConfirm = useCallback(() => {
    if (!pendingLinkedRoom) return;
    const shadowAssignment: ScheduleAssignment = {
      id: `assign-shadow-${Date.now()}-${pendingLinkedRoom.pairedRoomId}-${pendingLinkedRoom.timeBlockId}`,
      courseId: pendingLinkedRoom.courseId,
      roomId: pendingLinkedRoom.pairedRoomId,
      timeBlockId: pendingLinkedRoom.timeBlockId,
      instructorId: pendingLinkedRoom.instructorId,
      linkedRoomId: roomInventory.find((r) => r.code === pendingLinkedRoom!.primaryRoomCode)?.id,
      isShadow: true,
    };
    onAssignmentsChange([...assignments, shadowAssignment]);
    setPendingLinkedRoom(null);
  }, [pendingLinkedRoom, assignments, onAssignmentsChange]);

  const handleLinkedRoomDismiss = useCallback(() => {
    setPendingLinkedRoom(null);
  }, []);

  const handleInstructorChange = useCallback(
    (assignmentId: string, instructorId: string) => {
      const assignment = assignments.find((a) => a.id === assignmentId);
      if (!assignment) return;
      const updated = assignments.map((a) => {
        if (a.id === assignmentId) {
          return { ...a, instructorId };
        }
        // Update linked shadow if it points to this primary
        if (a.isShadow && a.linkedRoomId) {
          const primaryRoom = roomInventory.find((r) => r.id === a.linkedRoomId);
          const primaryAssignment = assignments.find(
            (p) => p.roomId === primaryRoom?.id && p.timeBlockId === a.timeBlockId && !p.isShadow
          );
          if (primaryAssignment?.id === assignmentId) {
            return { ...a, instructorId };
          }
        }
        return a;
      });
      onAssignmentsChange(updated);
    },
    [assignments, onAssignmentsChange]
  );

  const handlePlacementClick = useCallback(
    (roomId: string, timeBlockId: string) => {
      if (!pendingPlacement || !onPlaceCourse) return;
      const assignment = getAssignmentForSlot(roomId, timeBlockId);
      if (assignment) return;
      const isInstructorBusy = assignments.some(
        (a) =>
          !a.isShadow &&
          a.timeBlockId === timeBlockId &&
          a.instructorId === pendingPlacement.instructorId
      );
      if (isInstructorBusy) return;
      onPlaceCourse(
        pendingPlacement.courseId,
        pendingPlacement.instructorId,
        roomId,
        timeBlockId
      );
    },
    [pendingPlacement, onPlaceCourse, getAssignmentForSlot, assignments]
  );

  const handleRemove = useCallback(
    (assignmentId: string) => {
      const toRemove = assignments.find((a) => a.id === assignmentId);
      if (!toRemove) return;
      // Remove the assignment and any shadow in the paired room linked to this one
      onAssignmentsChange(
        assignments.filter(
          (a) =>
            a.id !== assignmentId &&
            !(a.isShadow && a.linkedRoomId === toRemove.roomId)
        )
      );
    },
    [assignments, onAssignmentsChange]
  );

  const pendingCourse = pendingPlacement
    ? courseRegistry.find((c) => c.id === pendingPlacement.courseId)
    : undefined;

  return (
    <div className="flex h-full flex-col">
      <LinkedRoomSuggestion
        open={!!pendingLinkedRoom}
        onOpenChange={(open) => !open && setPendingLinkedRoom(null)}
        primaryRoomCode={pendingLinkedRoom?.primaryRoomCode ?? ""}
        pairedRoomCode={pendingLinkedRoom?.pairedRoomCode ?? ""}
        courseCode={getCourse(pendingLinkedRoom?.courseId ?? "")?.code ?? ""}
        onConfirm={handleLinkedRoomConfirm}
        onDismiss={handleLinkedRoomDismiss}
      />
      <ScrollArea className="h-full w-full">
      <div className="inline-block min-w-full">
        <div className="sticky top-0 z-20 border-b bg-background">
          <TimeBlockHeader timeBlocks={timeBlocks} dimmedTimeBlockIds={inactiveTimeBlockIds} />
        </div>
        <div>
          {sortedRooms.map((room) => (
            <RoomRow key={room.id} room={room}>
              {timeBlocks.map((timeBlock) => {
                const columnDimmed = inactiveTimeBlockIds.has(timeBlock.id);
                const assignment = getAssignmentForSlot(room.id, timeBlock.id);
                const course = assignment ? getCourse(assignment.courseId) : undefined;
                const instructor = assignment ? getInstructor(assignment.instructorId) : undefined;
                const instructorCourseCount = instructor
                  ? instructorWorkload[instructor.id] ?? 0
                  : undefined;
                const instructorMaxWorkload = instructor?.maxWorkload ?? 3;
                const linkedRoomCode =
                  assignment?.isShadow && assignment.linkedRoomId
                    ? roomInventory.find((r) => r.id === assignment.linkedRoomId)?.code
                    : undefined;

                const isInstructorBusyAtTime = (instructorId: string) =>
                  assignments.some(
                    (a) =>
                      !a.isShadow &&
                      a.timeBlockId === timeBlock.id &&
                      a.instructorId === instructorId &&
                      a.id !== assignment?.id
                  );

                const isInstructorAtCapacity = (instructorId: string) =>
                  (instructorWorkload[instructorId] ?? 0) >= MAX_INSTRUCTOR_LOAD;

                const sectionProgress =
                  course && (course.sections ?? 1) > 1
                    ? {
                        scheduled: assignments.filter(
                          (a) => a.courseId === course.id && !a.isShadow
                        ).length,
                        total: course.sections ?? 1,
                      }
                    : undefined;

                const isEmpty = !assignment;
                const isInstructorBusyAtThisTime =
                  !!pendingPlacement &&
                  assignments.some(
                    (a) =>
                      !a.isShadow &&
                      a.timeBlockId === timeBlock.id &&
                      a.instructorId === pendingPlacement.instructorId
                  );
                const isPlacementTarget =
                  !!pendingPlacement &&
                  isEmpty &&
                  !isInstructorBusyAtThisTime;
                const isPlacementInstructorBusy =
                  !!pendingPlacement &&
                  isEmpty &&
                  isInstructorBusyAtThisTime;

                let isPrefixDimmed = false;
                if (shouldFilterByPrefix && course) {
                  const coursePrefix = course.prefix;
                  const matchesSelectedProgram = prefixFilter.some((programId) => {
                    const allowedPrefixes = PROGRAM_TO_PREFIXES[programId] ?? [];
                    return allowedPrefixes.includes(coursePrefix);
                  });
                  isPrefixDimmed = !matchesSelectedProgram;
                }

                const isCourseDimmed =
                  isPrefixDimmed ||
                  (shouldFilterByInstructor &&
                    !!assignment &&
                    !instructorFilterSet.has(assignment.instructorId));
                return (
                  <ScheduleCell
                    key={`${room.id}-${timeBlock.id}`}
                    room={room}
                    timeBlock={timeBlock}
                    assignment={assignment}
                    course={course}
                    instructor={instructor}
                    instructors={facultyRoster}
                    instructorCourseCount={instructorCourseCount}
                    instructorMaxWorkload={instructorMaxWorkload}
                    isShadow={assignment?.isShadow}
                    linkedRoomCode={linkedRoomCode}
                    sectionProgress={sectionProgress}
                    isInstructorBusyAtTime={isInstructorBusyAtTime}
                    isInstructorAtCapacity={isInstructorAtCapacity}
                    instructorWorkload={instructorWorkload}
                    maxInstructorLoad={MAX_INSTRUCTOR_LOAD}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onInstructorChange={handleInstructorChange}
                    isPlacementTarget={isPlacementTarget}
                    onPlacementClick={
                      isPlacementTarget
                        ? () => handlePlacementClick(room.id, timeBlock.id)
                        : undefined
                    }
                    placementPreviewCourse={
                      isPlacementTarget && pendingCourse ? pendingCourse : undefined
                    }
                    placementPreviewInstructor={
                      isPlacementTarget && pendingPlacement
                        ? facultyRoster.find((f) => f.id === pendingPlacement.instructorId)
                        : undefined
                    }
                    isPlacementInstructorBusy={isPlacementInstructorBusy}
                    isColumnDimmed={columnDimmed}
                    isPrefixDimmed={isCourseDimmed}
                  />
                );
              })}
            </RoomRow>
          ))}
        </div>
      </div>
    </ScrollArea>
    </div>
  );
}
