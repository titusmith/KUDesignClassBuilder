import { useState, useCallback, useMemo } from "react";
import type {
  ScheduleAssignment,
  Room,
  TimeBlock,
  Course,
  Faculty,
  DayPattern,
} from "@/data/schedulerTypes";
import { courseRegistry } from "@/data/courseRegistry";
import { ScheduleGrid } from "@/components/scheduler/ScheduleGrid";
import { SchedulerSidebar } from "@/components/scheduler/SchedulerSidebar";
import { FindRoomFab } from "@/components/scheduler/FindRoomFab";
import { FindRoomModal } from "@/components/scheduler/FindRoomModal";
import { ResolutionModal } from "@/components/scheduler/ResolutionModal";
import { InstructorConflictModal } from "@/components/scheduler/InstructorConflictModal";
import {
  AssignInstructorModal,
  type PendingInstructorAssignment,
} from "@/components/scheduler/AssignInstructorModal";
import type { Conflict } from "@/data/schedulerTypes";
import { FocusModeBar } from "@/components/scheduler/FocusModeBar";
import { facultyRoster } from "@/data/facultyRoster";

export function AdminDashboard() {
  const [assignments, setAssignments] = useState<ScheduleAssignment[]>([]);
  const [sidebarPrefixFilter, setSidebarPrefixFilter] = useState("");
  const [conflict, setConflict] = useState<Conflict | null>(null);
  const [resolutionModalOpen, setResolutionModalOpen] = useState(false);
  const [instructorConflictModalOpen, setInstructorConflictModalOpen] = useState(false);
  const [pendingAssignment, setPendingAssignment] =
    useState<PendingInstructorAssignment | null>(null);
  const [assignInstructorModalOpen, setAssignInstructorModalOpen] = useState(false);
  const [courseInstructorPreassignments, setCourseInstructorPreassignments] = useState<
    Record<string, string>
  >({});
  const [pendingPlacement, setPendingPlacement] = useState<{
    courseId: string;
    instructorId: string;
  } | null>(null);
  const [findRoomModalOpen, setFindRoomModalOpen] = useState(false);

  // Focus mode "Programs" options for grid view
  const programFilterOptions = useMemo(
    () => ["VISC", "IXD", "INDD", "ILLU", "ANIM"],
    []
  );
  const prefixOptions = programFilterOptions;
  const [dayPatternFilter, setDayPatternFilter] = useState<"all" | DayPattern>("all");
  const [gridPrefixFilter, setGridPrefixFilter] = useState<string[]>(programFilterOptions);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const instructorOptions = useMemo(() => facultyRoster.map((f) => f.id), []);
  const [instructorFilter, setInstructorFilter] = useState<string[]>(instructorOptions);

  const handleInstructorPreassign = useCallback(
    (courseId: string, instructorId: string) => {
      setCourseInstructorPreassignments((prev) => ({
        ...prev,
        [courseId]: instructorId,
      }));
    },
    []
  );

  const handleCourseScheduled = useCallback((courseId: string) => {
    setCourseInstructorPreassignments((prev) => {
      const next = { ...prev };
      delete next[courseId];
      return next;
    });
  }, []);

  const handleConflict = useCallback(
    (c: {
      type: "room" | "time" | "both" | "instructor";
      room: Room;
      timeBlock: TimeBlock;
      existingAssignment?: ScheduleAssignment;
      existingCourse?: Course;
      existingInstructor?: Faculty;
      proposedCourse: Course;
      proposedInstructor?: Faculty;
      movingAssignmentId?: string;
    }) => {
      setConflict({
        type: c.type,
        room: c.room,
        timeBlock: c.timeBlock,
        existingAssignment: c.existingAssignment,
        existingCourse: c.existingCourse,
        existingInstructor: c.existingInstructor,
        proposedCourse: c.proposedCourse,
        proposedInstructor: c.proposedInstructor,
        movingAssignmentId: c.movingAssignmentId,
      });
      if (c.type === "instructor") {
        setInstructorConflictModalOpen(true);
      } else {
        setResolutionModalOpen(true);
      }
    },
    []
  );

  const handleInstructorConflictResolve = useCallback(
    (instructorId: string) => {
      if (!conflict || conflict.type !== "instructor") return;
      const { room, timeBlock, proposedCourse, movingAssignmentId } = conflict;

      if (movingAssignmentId) {
        // Move: update the existing assignment and remove shadows from old slot
        setAssignments((prev) => {
          const moving = prev.find((a) => a.id === movingAssignmentId);
          if (!moving) return prev;
          const oldRoomId = moving.roomId;
          const oldTimeBlockId = moving.timeBlockId;
          const updated = prev
            .map((a) =>
              a.id === movingAssignmentId
                ? { ...a, roomId: room.id, timeBlockId: timeBlock.id, instructorId }
                : a
            )
            .filter(
              (a) =>
                !(
                  a.isShadow &&
                  a.linkedRoomId === oldRoomId &&
                  a.timeBlockId === oldTimeBlockId
                )
            );
          return updated;
        });
      } else {
        // New drop from sidebar: create assignment
        const newAssignment: ScheduleAssignment = {
          id: `assign-${Date.now()}-${room.id}-${timeBlock.id}`,
          courseId: proposedCourse.id,
          roomId: room.id,
          timeBlockId: timeBlock.id,
          instructorId,
        };
        setAssignments((prev) => [...prev, newAssignment]);
        handleCourseScheduled(proposedCourse.id);
      }
    },
    [conflict, handleCourseScheduled]
  );

  const handlePendingInstructorAssignment = useCallback(
    (pending: PendingInstructorAssignment) => {
      setPendingAssignment(pending);
      setAssignInstructorModalOpen(true);
    },
    []
  );

  const handleAssignInstructorResolve = useCallback(
    (instructorId: string) => {
      if (!pendingAssignment) return;
      const { room, timeBlock, course } = pendingAssignment;
      const newAssignment = {
        id: `assign-${Date.now()}-${room.id}-${timeBlock.id}`,
        courseId: course.id,
        roomId: room.id,
        timeBlockId: timeBlock.id,
        instructorId,
      };
      setAssignments((prev) => [...prev, newAssignment]);
      handleCourseScheduled(course.id);
      setPendingAssignment(null);
    },
    [pendingAssignment, handleCourseScheduled]
  );

  const handleStartPlacement = useCallback(
    (courseId: string, instructorId: string) => {
      setPendingPlacement({ courseId, instructorId });
    },
    []
  );

  const handlePlaceCourse = useCallback(
    (courseId: string, instructorId: string, roomId: string, timeBlockId: string) => {
      const newAssignment: ScheduleAssignment = {
        id: `assign-${Date.now()}-${roomId}-${timeBlockId}`,
        courseId,
        roomId,
        timeBlockId,
        instructorId,
      };
      setAssignments((prev) => [...prev, newAssignment]);
      handleCourseScheduled(courseId);
      setPendingPlacement(null);
    },
    [handleCourseScheduled]
  );

  const handlePlacementCancel = useCallback(() => {
    setPendingPlacement(null);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3">
        <h1 className="text-lg font-semibold">
          Fall 2026 KU Design Class Scheduler
        </h1>
        <div className="flex items-center gap-4">
          {pendingPlacement && (
            <div className="flex items-center gap-3 text-sm">
              <span>
                Click a cell to place{" "}
                <strong>
                  {courseRegistry.find((c) => c.id === pendingPlacement.courseId)?.code ?? ""}
                </strong>
              </span>
              <button
                type="button"
                onClick={handlePlacementCancel}
                className="text-muted-foreground hover:text-foreground underline"
              >
                Cancel (ESC)
              </button>
            </div>
          )}
          <FocusModeBar
            focusModeEnabled={focusModeEnabled}
            onFocusModeChange={setFocusModeEnabled}
            dayPatternFilter={dayPatternFilter}
            onDayPatternFilterChange={setDayPatternFilter}
            prefixFilter={gridPrefixFilter}
            onPrefixFilterChange={setGridPrefixFilter}
            prefixOptions={prefixOptions}
            instructorFilter={instructorFilter}
            onInstructorFilterChange={setInstructorFilter}
            instructorOptions={instructorOptions}
          />
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        <SchedulerSidebar
          assignments={assignments}
          courseInstructorPreassignments={courseInstructorPreassignments}
          onInstructorPreassign={handleInstructorPreassign}
          onStartPlacement={handleStartPlacement}
          onPlacementCancel={handlePlacementCancel}
          prefixFilter={sidebarPrefixFilter}
          onPrefixFilterChange={setSidebarPrefixFilter}
        />
        <main className="flex-1 overflow-hidden p-4">
          <ScheduleGrid
            assignments={assignments}
            courseInstructorPreassignments={courseInstructorPreassignments}
            onAssignmentsChange={setAssignments}
            onCourseScheduled={handleCourseScheduled}
            onPendingInstructorAssignment={handlePendingInstructorAssignment}
            onConflict={handleConflict}
            pendingPlacement={pendingPlacement}
            onPlacementCancel={handlePlacementCancel}
            onPlaceCourse={handlePlaceCourse}
            dayPatternFilter={dayPatternFilter}
            onDayPatternFilterChange={setDayPatternFilter}
            prefixFilter={gridPrefixFilter}
            onPrefixFilterChange={setGridPrefixFilter}
            prefixOptions={prefixOptions}
            focusModeEnabled={focusModeEnabled}
            instructorFilter={instructorFilter}
          />
        </main>
      </div>
      <ResolutionModal
        conflict={conflict}
        open={resolutionModalOpen}
        onOpenChange={setResolutionModalOpen}
      />
      <InstructorConflictModal
        conflict={conflict}
        open={instructorConflictModalOpen}
        assignments={assignments}
        onOpenChange={setInstructorConflictModalOpen}
        onResolve={handleInstructorConflictResolve}
      />
      <AssignInstructorModal
        pending={pendingAssignment}
        open={assignInstructorModalOpen}
        assignments={assignments}
        onOpenChange={(open) => {
          setAssignInstructorModalOpen(open);
          if (!open) setPendingAssignment(null);
        }}
        onResolve={handleAssignInstructorResolve}
      />
      <FindRoomFab onClick={() => setFindRoomModalOpen(true)} />
      <FindRoomModal
        open={findRoomModalOpen}
        onOpenChange={setFindRoomModalOpen}
        assignments={assignments}
        pendingPlacement={pendingPlacement}
        onSelectRoom={
          pendingPlacement
            ? (roomId, timeBlockId) =>
                handlePlaceCourse(
                  pendingPlacement.courseId,
                  pendingPlacement.instructorId,
                  roomId,
                  timeBlockId
                )
            : undefined
        }
      />
    </div>
  );
}
