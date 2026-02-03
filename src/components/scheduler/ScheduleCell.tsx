import type { Room, TimeBlock } from "@/data/schedulerTypes";
import type { ScheduleAssignment } from "@/data/schedulerTypes";
import type { Course } from "@/data/schedulerTypes";
import type { Faculty } from "@/data/schedulerTypes";
import { cn } from "@/lib/utils";
import { getPrefixColor } from "@/data/prefixColors";
import { CourseTile } from "./CourseTile";

interface ScheduleCellProps {
  room: Room;
  timeBlock: TimeBlock;
  assignment?: ScheduleAssignment;
  course?: Course;
  instructor?: Faculty;
  instructors: Faculty[];
  instructorCourseCount?: number;
  instructorMaxWorkload?: number;
  isShadow?: boolean;
  linkedRoomCode?: string;
  /** For multi-section courses: (scheduled/total) next to course code */
  sectionProgress?: { scheduled: number; total: number };
  /** Grey out instructors already teaching at this time block */
  isInstructorBusyAtTime?: (instructorId: string) => boolean;
  /** Grey out instructors at workload capacity */
  isInstructorAtCapacity?: (instructorId: string) => boolean;
  instructorWorkload?: Record<string, number>;
  maxInstructorLoad?: number;
  onDrop?: (
    roomId: string,
    timeBlockId: string,
    courseId: string,
    assignmentId?: string
  ) => void;
  onRemove?: (assignmentId: string) => void;
  onInstructorChange?: (assignmentId: string, instructorId: string) => void;
  onLinkedRoomConfirm?: (roomId: string, timeBlockId: string, courseId: string, linkedRoomId: string) => void;
  onLinkedRoomDismiss?: () => void;
  isDropTarget?: boolean;
  /** When in placement mode from Add Course flow */
  isPlacementTarget?: boolean;
  onPlacementClick?: () => void;
  /** Course/instructor to show as hover preview when isPlacementTarget */
  placementPreviewCourse?: Course;
  placementPreviewInstructor?: Faculty;
  /** When in placement mode but instructor already teaching at this time - show message on hover */
  isPlacementInstructorBusy?: boolean;
  className?: string;
  isColumnDimmed?: boolean;
  isPrefixDimmed?: boolean;
}

export function ScheduleCell({
  room,
  timeBlock,
  assignment,
  course,
  instructor,
  instructors,
  instructorCourseCount,
  instructorMaxWorkload,
  isShadow = false,
  linkedRoomCode,
  sectionProgress,
  isInstructorBusyAtTime,
  isInstructorAtCapacity,
  instructorWorkload = {},
  maxInstructorLoad = 5,
  onDrop,
  onRemove,
  onInstructorChange,
  onLinkedRoomConfirm,
  onLinkedRoomDismiss,
  isDropTarget = false,
  isPlacementTarget = false,
  onPlacementClick,
  placementPreviewCourse,
  placementPreviewInstructor,
  isPlacementInstructorBusy = false,
  className,
  isColumnDimmed = false,
  isPrefixDimmed = false,
}: ScheduleCellProps) {
  const handleDragOver = (e: React.DragEvent) => {
    if (onDrop) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const courseId = e.dataTransfer.getData("application/x-course-id");
    const assignmentId = e.dataTransfer.getData("application/x-assignment-id") || undefined;
    if (courseId && onDrop) {
      onDrop(room.id, timeBlock.id, courseId, assignmentId);
    }
  };

  const hasContent = assignment && course;

  const handleClick = isPlacementTarget && onPlacementClick
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onPlacementClick();
      }
    : undefined;

  return (
    <div
      className={cn(
        "flex min-w-[160px] flex-1 flex-col items-center justify-center border-r p-3 last:border-r-0",
        "min-h-[80px] transition-colors",
        isDropTarget && "bg-primary/5 ring-1 ring-primary/20",
        (isPlacementTarget || isPlacementInstructorBusy) && "group",
        isPlacementTarget && "cursor-pointer",
        !hasContent && !isPlacementTarget && !isPlacementInstructorBusy && "hover:bg-muted/50",
        isColumnDimmed && "opacity-30",
        className
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      role={isPlacementTarget ? "button" : undefined}
      data-room-id={room.id}
      data-time-block-id={timeBlock.id}
    >
      {hasContent ? (
        <CourseTile
          course={course}
          instructor={instructor}
          instructors={instructors}
          assignmentId={assignment?.id}
          instructorCourseCount={instructorCourseCount}
          instructorMaxWorkload={instructorMaxWorkload}
          isShadow={isShadow}
          linkedRoomCode={linkedRoomCode}
          sectionProgress={sectionProgress}
          prefixBorderClass={course ? getPrefixColor(course.prefix).border : undefined}
          prefixBorderMutedClass={course ? getPrefixColor(course.prefix).borderMuted : undefined}
          prefixFillClass={course ? getPrefixColor(course.prefix).fill : undefined}
          onRemove={onRemove && assignment ? () => onRemove(assignment.id) : undefined}
          onInstructorChange={onInstructorChange}
          isInstructorBusyAtTime={isInstructorBusyAtTime}
          isInstructorAtCapacity={isInstructorAtCapacity}
          instructorWorkload={instructorWorkload}
          maxInstructorLoad={maxInstructorLoad}
          dimmed={isPrefixDimmed}
        />
      ) : isPlacementTarget && placementPreviewCourse ? (
        <div className="w-full opacity-0 transition-opacity duration-150 group-hover:opacity-60 pointer-events-none">
          <CourseTile
            course={placementPreviewCourse}
            instructor={placementPreviewInstructor}
            instructors={instructors}
            prefixBorderClass={getPrefixColor(placementPreviewCourse.prefix).border}
            prefixBorderMutedClass={getPrefixColor(placementPreviewCourse.prefix).borderMuted}
            prefixFillClass={getPrefixColor(placementPreviewCourse.prefix).fill}
            draggable={false}
          />
        </div>
      ) : isPlacementInstructorBusy ? (
        <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 text-xs text-muted-foreground text-center px-1 pointer-events-none">
          Instructor already has a course at this time
        </span>
      ) : null}
    </div>
  );
}
