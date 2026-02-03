import { useState } from "react";
import type { Course, Faculty } from "@/data/schedulerTypes";
import { cn } from "@/lib/utils";
import { GripVertical, Check, X, ChevronDown, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InstructorCombobox } from "./InstructorCombobox";
import { setCourseTileDragImage } from "@/lib/dragPreview";

interface CourseTileProps {
  course: Course;
  instructor?: Faculty;
  instructors: Faculty[];
  assignmentId?: string;
  isShadow?: boolean;
  linkedRoomCode?: string;
  /** Border color class for prefix (e.g. border-blue-500) */
  prefixBorderClass?: string;
  /** Muted border when scheduled - same opacity as fill (e.g. border-blue-500/15) */
  prefixBorderMutedClass?: string;
  /** Fill background when scheduled (e.g. bg-blue-500/15) */
  prefixFillClass?: string;
  /** Current course count for this instructor (for workload display) */
  instructorCourseCount?: number;
  /** Max workload requirement for this instructor (2 or 3) */
  instructorMaxWorkload?: number;
  onRemove?: () => void;
  onInstructorChange?: (assignmentId: string, instructorId: string) => void;
  /** When provided and no instructor, shows "Click to assign instructor" (sidebar) */
  onAssignInstructor?: (instructorId: string) => void;
  /** Optional badge in first row (e.g. "Scheduled" or "3/4 left") */
  badge?: React.ReactNode;
  /** For multi-section courses: show (scheduled/total) next to course code on grid */
  sectionProgress?: { scheduled: number; total: number };
  /** When provided, shows this instead of instructor (e.g. "2 sections scheduled") */
  scheduledLabel?: string;
  /** When true, scheduledLabel is horizontally scrollable (multi-section instructor list) */
  scheduledLabelScrollable?: boolean;
  /** For InstructorCombobox: grey out instructors at capacity (sidebar) */
  isInstructorAtCapacity?: (instructorId: string) => boolean;
  /** For grid: grey out instructors already teaching at this time block */
  isInstructorBusyAtTime?: (instructorId: string) => boolean;
  instructorWorkload?: Record<string, number>;
  maxInstructorLoad?: number;
  draggable?: boolean;
  /** When true (sidebar scheduled cards), show check instead of grip icon */
  showCheckInsteadOfGrip?: boolean;
  /** Visually deemphasize card (used for grid filters) */
  dimmed?: boolean;
}

export function CourseTile({
  course,
  instructor,
  instructors,
  assignmentId,
  isShadow = false,
  linkedRoomCode,
  prefixBorderClass,
  prefixBorderMutedClass,
  prefixFillClass,
  instructorCourseCount,
  instructorMaxWorkload,
  onRemove,
  onInstructorChange,
  onAssignInstructor,
  badge,
  sectionProgress,
  scheduledLabel,
  scheduledLabelScrollable = false,
  isInstructorAtCapacity,
  isInstructorBusyAtTime,
  instructorWorkload = {},
  maxInstructorLoad = 5,
  draggable = true,
  showCheckInsteadOfGrip = false,
  dimmed = false,
}: CourseTileProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    if (draggable) {
      e.dataTransfer.setData("application/x-course-id", course.id);
      if (assignmentId && assignmentId.startsWith("assign-")) {
        e.dataTransfer.setData("application/x-assignment-id", assignmentId);
      }
      e.dataTransfer.effectAllowed = "move";
      setCourseTileDragImage(e, {
        course,
        instructor,
        instructorCourseCount,
        instructorMaxWorkload,
        prefixBorderClass,
      });
    }
  };

  const canChangeInstructor =
    !isShadow &&
    (assignmentId || onAssignInstructor) &&
    (onInstructorChange || onAssignInstructor) &&
    instructors.length > 0;

  const isInstructorDisabled = (id: string) =>
    (isInstructorAtCapacity?.(id) ?? false) || (isInstructorBusyAtTime?.(id) ?? false);
  const getDisabledMessageForCombobox = (id: string) => {
    if (isInstructorBusyAtTime?.(id)) return " (already teaching at this time)";
    if (isInstructorAtCapacity?.(id))
      return ` (${instructorWorkload[id] ?? 0}/${maxInstructorLoad} at capacity)`;
    return undefined;
  };

  return (
    <div
      className={cn(
        "group relative flex min-w-0 w-full flex-col gap-0.5 rounded-md border-2 px-2 py-1.5 text-left overflow-hidden [contain:inline-size]",
        draggable && "cursor-grab active:cursor-grabbing",
        isShadow
          ? "border-dashed border-muted-foreground/40 bg-muted/50"
          : prefixBorderClass
            ? `${prefixFillClass ? (prefixBorderMutedClass ?? prefixBorderClass) : prefixBorderClass} shadow-sm ${prefixFillClass ?? "bg-card"}`
            : "border-2 border-border bg-card shadow-sm",
        dimmed && "opacity-40"
      )}
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      {/* Top row: icon + course name (left) + badge + remove */}
      <div className="flex items-center justify-between gap-1">
        {showCheckInsteadOfGrip ? (
          <>
            <Check className="h-3 w-3 shrink-0 text-muted-foreground" />
            {/* Course name in instructor view - right after checkmark */}
            <span className="text-sm font-medium">
              {course.code}
              {sectionProgress && sectionProgress.total > 1 && (
                <span className="tabular-nums text-muted-foreground/70">
                  {" "}
                  ({sectionProgress.scheduled}/{sectionProgress.total})
                </span>
              )}
            </span>
          </>
        ) : (
          <>
            <GripVertical className="h-3 w-3 shrink-0 text-muted-foreground" />
            {/* Course name in course view - right after grip icon, moved to left */}
            <span className="text-sm font-medium">
              {course.code}
              {sectionProgress && sectionProgress.total > 1 && (
                <span className="tabular-nums text-muted-foreground/70">
                  {" "}
                  ({sectionProgress.scheduled}/{sectionProgress.total})
                </span>
              )}
            </span>
          </>
        )}
        {badge}
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      {/* Second row: instructor info + course name again (right, grey) - horizontally scrollable */}
      <div className="min-w-0 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1">
        <div className="min-w-max flex items-center gap-2">
          {instructor && canChangeInstructor ? (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full min-w-max items-center gap-1 text-left text-xs text-muted-foreground hover:text-foreground hover:underline focus:outline-none focus:ring-1 focus:ring-ring rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="whitespace-nowrap">
                {instructor.name}
                {instructorCourseCount != null && instructorMaxWorkload != null && (
                  <span
                    className={cn(
                      "tabular-nums",
                      instructorCourseCount > instructorMaxWorkload
                        ? "text-red-600"
                        : "text-muted-foreground"
                    )}
                  >
                    {" "}
                    ({instructorCourseCount}/{instructorMaxWorkload})
                  </span>
                )}
              </span>
              <ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-56 bg-white p-2 shadow-lg dark:bg-zinc-900"
            align="start"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Assign instructor
            </p>
            <InstructorCombobox
              instructors={instructors}
              onSelect={(value) => {
                onInstructorChange?.(assignmentId!, value);
                setPopoverOpen(false);
              }}
              isInstructorAtCapacity={isInstructorDisabled}
              instructorWorkload={instructorWorkload}
              maxLoad={maxInstructorLoad}
              getDisabledMessage={getDisabledMessageForCombobox}
              placeholder="Type to search..."
            />
          </PopoverContent>
        </Popover>
      ) : instructor ? (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {instructor.name}
          {instructorCourseCount != null && instructorMaxWorkload != null && (
            <span
              className={cn(
                "tabular-nums",
                instructorCourseCount > instructorMaxWorkload
                  ? "text-red-600"
                  : "text-muted-foreground"
              )}
            >
              {" "}
              ({instructorCourseCount}/{instructorMaxWorkload})
            </span>
          )}
        </span>
      ) : scheduledLabel ? (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {scheduledLabel}
        </span>
          ) : onAssignInstructor ? (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex w-full min-w-max items-center gap-1 text-left text-xs text-muted-foreground hover:text-foreground hover:underline focus:outline-none focus:ring-1 focus:ring-ring rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <UserPlus className="h-3.5 w-3.5 shrink-0" />
                  <span>Click to assign instructor</span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 bg-white p-2 shadow-lg dark:bg-zinc-900"
                align="start"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Assign instructor
                </p>
                <InstructorCombobox
                  instructors={instructors}
                  onSelect={(value) => {
                    onAssignInstructor(value);
                    setPopoverOpen(false);
                  }}
                  isInstructorAtCapacity={isInstructorDisabled}
                  instructorWorkload={instructorWorkload}
                  maxLoad={maxInstructorLoad}
                  getDisabledMessage={getDisabledMessageForCombobox}
                  placeholder="Type to search..."
                />
              </PopoverContent>
            </Popover>
          ) : null}
          {linkedRoomCode && isShadow && (
            <span className="whitespace-nowrap text-xs text-muted-foreground">
              Paired with {linkedRoomCode}
            </span>
          )}
          {/* Course name again on right in grey */}
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-auto">
            {course.code}
            {sectionProgress && sectionProgress.total > 1 && (
              <span className="tabular-nums">
                {" "}
                ({sectionProgress.scheduled}/{sectionProgress.total})
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
