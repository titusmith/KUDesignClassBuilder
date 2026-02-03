import { useState, useMemo } from "react";
import type { Course, Faculty, ScheduleAssignment } from "@/data/schedulerTypes";
import { courseRegistry } from "@/data/courseRegistry";
import { facultyRoster } from "@/data/facultyRoster";
import { MAX_INSTRUCTOR_LOAD } from "@/data/schedulerConfig";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseTile } from "./CourseTile";
import { AddCourseModal } from "./AddCourseModal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Calendar, Globe, BookOpen, Users, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPrefixColor } from "@/data/prefixColors";
import { roomInventory } from "@/data/roomInventory";
import { timeBlocks } from "@/data/timeBlocks";

const COURSE_PREFIXES = ["ADS", "ANIM", "INDD", "ILLU", "IXD", "VISC", "BDS"] as const;

// Mock APPT/Online sections - in real app these would come from data
const apptOnlineCourses: Course[] = [
  { id: "appt-1", code: "APPT 001", prefix: "APPT", number: "001", isApptOrOnline: true },
  { id: "online-1", code: "Online Section", prefix: "ONL", number: "001", isApptOrOnline: true },
];

interface SchedulerSidebarProps {
  assignments: ScheduleAssignment[];
  courseInstructorPreassignments: Record<string, string>;
  onInstructorPreassign: (courseId: string, instructorId: string) => void;
  onStartPlacement?: (courseId: string, instructorId: string) => void;
  onPlacementCancel?: () => void;
  prefixFilter?: string;
  onPrefixFilterChange?: (prefix: string) => void;
}

function getInstructor(instructorId: string): Faculty | undefined {
  return facultyRoster.find((f) => f.id === instructorId);
}

function getRoomTimeLabel(assignment: ScheduleAssignment): string {
  const room = roomInventory.find((r) => r.id === assignment.roomId);
  const timeBlock = timeBlocks.find((tb) => tb.id === assignment.timeBlockId);
  const roomCode = room?.code ?? "—";
  const timeLabel = timeBlock?.label ?? "—";
  return `${roomCode} · ${timeLabel}`;
}

function formatInstructorInitialLastName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  const firstInitial = parts[0][0]?.toUpperCase() ?? "";
  const lastName = parts[parts.length - 1] ?? "";
  return `${firstInitial}. ${lastName}`;
}

function getDayStartLabel(assignment: ScheduleAssignment): string {
  const timeBlock = timeBlocks.find((tb) => tb.id === assignment.timeBlockId);
  if (!timeBlock) return "—";
  const dayLabel =
    timeBlock.dayPattern === "MW" ? "M/W" : timeBlock.dayPattern === "TTh" ? "T/Th" : timeBlock.dayPattern;
  return `${dayLabel} ${timeBlock.start}`;
}

function getRoomCode(assignment: ScheduleAssignment): string {
  const room = roomInventory.find((r) => r.id === assignment.roomId);
  return room?.code ?? "—";
}

export function SchedulerSidebar({
  assignments,
  courseInstructorPreassignments,
  onInstructorPreassign,
  onStartPlacement,
  onPlacementCancel,
  prefixFilter = "",
  onPrefixFilterChange,
}: SchedulerSidebarProps) {
  const [apptOpen, setApptOpen] = useState(false);
  const [addCourseInstructor, setAddCourseInstructor] = useState<Faculty | null>(null);
  const [workloadAtCapacityInstructor, setWorkloadAtCapacityInstructor] = useState<Faculty | null>(null);

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

  const mustScheduleCourses = useMemo(() => {
    const filtered = courseRegistry.filter((c) => !c.isApptOrOnline);
    if (prefixFilter) {
      return filtered.filter((c) => c.prefix === prefixFilter);
    }
    return filtered;
  }, [prefixFilter]);

  const unscheduledCount = useMemo(() => {
    return mustScheduleCourses.reduce((acc, c) => {
      const scheduled = assignments.filter(
        (a) => a.courseId === c.id && !a.isShadow
      ).length;
      const sections = c.sections ?? 1;
      return acc + Math.max(0, sections - scheduled);
    }, 0);
  }, [mustScheduleCourses, assignments]);

  const getScheduledCountForCourse = (courseId: string) =>
    assignments.filter((a) => a.courseId === courseId && !a.isShadow).length;

  const isInstructorAtCapacity = (instructorId: string) =>
    (instructorWorkload[instructorId] ?? 0) >= MAX_INSTRUCTOR_LOAD;

  /** Instructor view: courses grouped by instructor (from assignments + preassignments) */
  const instructorGroups = useMemo(() => {
    const getScheduled = (courseId: string) =>
      assignments.filter((a) => a.courseId === courseId && !a.isShadow).length;

    type Entry = { course: Course; assignmentId?: string };
    const groups: Record<string, Entry[]> = {};
    facultyRoster.forEach((f) => {
      groups[f.id] = [];
    });
    groups["__unassigned__"] = [];

    // From assignments (on grid)
    assignments
      .filter((a) => !a.isShadow)
      .forEach((a) => {
        const course = courseRegistry.find((c) => c.id === a.courseId);
        if (course && !course.isApptOrOnline) {
          if (prefixFilter && course.prefix !== prefixFilter) return;
          if (!groups[a.instructorId]) groups[a.instructorId] = [];
          groups[a.instructorId].push({ course, assignmentId: a.id });
        }
      });

    // From preassignments (sidebar)
    Object.entries(courseInstructorPreassignments).forEach(([courseId, instructorId]) => {
      const course = courseRegistry.find((c) => c.id === courseId);
      if (!course || course.isApptOrOnline) return;
      if (prefixFilter && course.prefix !== prefixFilter) return;
      const scheduledCount = getScheduled(courseId);
      const sectionCount = course.sections ?? 1;
      if (scheduledCount < sectionCount) {
        if (!groups[instructorId]) groups[instructorId] = [];
        groups[instructorId].push({ course, assignmentId: undefined });
      }
    });

    // Unassigned: courses with unscheduled sections and no preassignment
    mustScheduleCourses.forEach((course) => {
      const scheduledCount = getScheduled(course.id);
      const preassigned = !!courseInstructorPreassignments[course.id];
      const sectionCount = course.sections ?? 1;
      const unscheduledNoInstructor = sectionCount - scheduledCount - (preassigned ? 1 : 0);
      for (let i = 0; i < unscheduledNoInstructor; i++) {
        groups["__unassigned__"].push({ course, assignmentId: undefined });
      }
    });

    return groups;
  }, [assignments, courseInstructorPreassignments, mustScheduleCourses, prefixFilter]);

  return (
    <Tabs
      defaultValue="courses"
      onValueChange={() => onPlacementCancel?.()}
      className="flex w-64 shrink-0 flex-col overflow-hidden border-r bg-sidebar text-sidebar-foreground"
    >
      <div className="border-b bg-muted/80 p-3 backdrop-blur-sm">
        <h2 className="font-semibold">Fall 2026 Schedule</h2>
        <div className="mt-2">
          <Select
            value={prefixFilter || "all"}
            onValueChange={(v) => onPrefixFilterChange?.(v === "all" ? "" : v)}
          >
            <SelectTrigger className="h-8 w-full bg-background">
              <SelectValue placeholder="All prefixes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="flex items-center gap-1.5">All prefixes</span>
              </SelectItem>
              {COURSE_PREFIXES.map((p) => (
                <SelectItem key={p} value={p}>
                  <span className="flex items-center gap-1.5">
                    {p}
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        getPrefixColor(p).dot
                      )}
                      aria-hidden
                    />
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <TabsList className="mt-3 grid w-full grid-cols-2 gap-1 rounded-lg bg-muted/50 p-1">
          <TabsTrigger
            value="courses"
            className="gap-1.5 rounded-md border-2 border-transparent text-xs data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="instructors"
            className="gap-1.5 rounded-md border-2 border-transparent text-xs data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Users className="h-3.5 w-3.5" />
            Instructors
          </TabsTrigger>
        </TabsList>
      </div>
      <ScrollArea className="flex-1 min-w-0 overflow-hidden">
        <div className="w-full min-w-0 overflow-x-clip p-2">
          <TabsContent value="courses" className="mt-0 focus-visible:outline-none">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-sm font-medium">Must-Schedule</span>
            <Badge variant="secondary" className="text-xs">
              {unscheduledCount} unscheduled
            </Badge>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            {mustScheduleCourses.map((course) => {
              const scheduledCount = getScheduledCountForCourse(course.id);
              const sectionCount = course.sections ?? 1;
              const allScheduled = scheduledCount >= sectionCount;
              const preassignedInstructorId = courseInstructorPreassignments[course.id];
              const instructor = preassignedInstructorId
                ? getInstructor(preassignedInstructorId)
                : undefined;
              const hasInstructor = !!instructor;
              const canDrag = !allScheduled;
              const sectionsLeft = sectionCount - scheduledCount;
              const courseAssignments = allScheduled
                ? assignments.filter((a) => a.courseId === course.id && !a.isShadow)
                : [];
              const firstAssignment = courseAssignments[0];
              const scheduledLabel =
                allScheduled && firstAssignment
                  ? scheduledCount >= 2
                    ? courseAssignments
                        .map((a) => {
                          const assignInstructor = getInstructor(a.instructorId);
                          const instructorPart = assignInstructor
                            ? formatInstructorInitialLastName(assignInstructor.name)
                            : "—";
                          const dayStart = getDayStartLabel(a);
                          const roomCode = getRoomCode(a);
                          return `${instructorPart} · ${dayStart} · ${roomCode}`;
                        })
                        .join(" • ")
                    : (() => {
                        const assignInstructor = getInstructor(firstAssignment.instructorId);
                        const instructorPart = assignInstructor
                          ? formatInstructorInitialLastName(assignInstructor.name)
                          : "";
                        const dayStart = getDayStartLabel(firstAssignment);
                        const roomCode = getRoomCode(firstAssignment);
                        return instructorPart
                          ? `${instructorPart} · ${dayStart} · ${roomCode}`
                          : `${dayStart} · ${roomCode}`;
                      })()
                  : undefined;
              const scheduledLabelScrollable = allScheduled && scheduledCount >= 2;

              return (
                <div key={course.id} className="min-w-0">
                  <CourseTile
                    course={course}
                    instructor={allScheduled ? undefined : instructor}
                    instructors={facultyRoster}
                    assignmentId={course.id}
                    prefixBorderClass={getPrefixColor(course.prefix).border}
                    prefixBorderMutedClass={allScheduled ? getPrefixColor(course.prefix).borderMuted : undefined}
                    prefixFillClass={allScheduled ? getPrefixColor(course.prefix).fill : undefined}
                    instructorCourseCount={
                      instructor ? instructorWorkload[instructor.id] ?? 0 : undefined
                    }
                    instructorMaxWorkload={instructor?.maxWorkload ?? 3}
                    onInstructorChange={
                      hasInstructor && !allScheduled
                        ? (_, instructorId) => onInstructorPreassign(course.id, instructorId)
                        : undefined
                    }
                    onAssignInstructor={
                      !hasInstructor && !allScheduled
                        ? (instructorId) => {
                            if (onStartPlacement) {
                              onStartPlacement(course.id, instructorId);
                            } else {
                              onInstructorPreassign(course.id, instructorId);
                            }
                          }
                        : undefined
                    }
                    badge={
                      allScheduled ? undefined : scheduledCount > 0 ? (
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {sectionsLeft}/{sectionCount} left
                        </Badge>
                      ) : undefined
                    }
                    scheduledLabel={scheduledLabel}
                    scheduledLabelScrollable={scheduledLabelScrollable}
                    showCheckInsteadOfGrip={allScheduled}
                    isInstructorAtCapacity={isInstructorAtCapacity}
                    instructorWorkload={instructorWorkload}
                    maxInstructorLoad={MAX_INSTRUCTOR_LOAD}
                    draggable={canDrag}
                  />
                </div>
              );
            })}
          </div>

          <Collapsible open={apptOpen} onOpenChange={setApptOpen}>
            <CollapsibleTrigger className="mt-4 flex w-full cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-sidebar-accent">
              {apptOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Calendar className="h-4 w-4" />
              <span>APPT / Online-Only</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-1 flex flex-col gap-1 pl-6">
                {apptOnlineCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-2 rounded-md border border-dashed bg-muted/30 px-2 py-1.5 text-sm text-muted-foreground"
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <span>{course.code}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          </TabsContent>

          <TabsContent value="instructors" className="mt-0 min-w-0 focus-visible:outline-none">
            <div className="flex min-w-0 flex-col gap-4">
              {facultyRoster.map((faculty) => {
                const entries = instructorGroups[faculty.id] ?? [];
                return (
                  <div key={faculty.id} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1">
                        <span className="whitespace-nowrap text-sm font-medium">{faculty.name}</span>
                        <span
                          className={cn(
                            "shrink-0 text-xs tabular-nums",
                            (instructorWorkload[faculty.id] ?? 0) >= 4
                              ? "text-red-600"
                              : "text-muted-foreground"
                          )}
                        >
                          {instructorWorkload[faculty.id] ?? 0}/{faculty.maxWorkload ?? 3}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => {
                          const count = instructorWorkload[faculty.id] ?? 0;
                          const maxWorkload = faculty.maxWorkload ?? 3;
                          if (count >= maxWorkload) {
                            setWorkloadAtCapacityInstructor(faculty);
                          } else {
                            setAddCourseInstructor(faculty);
                          }
                        }}
                        aria-label={`Add course to ${faculty.name}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="rounded-md bg-muted/30 p-2">
                      <div className="flex flex-col gap-1">
                      {entries.length === 0 ? (
                        <p className="py-2 text-center text-xs text-muted-foreground">
                          No courses assigned
                        </p>
                      ) : (
                      entries.map(({ course, assignmentId }, idx) => {
                        const scheduledCount = getScheduledCountForCourse(course.id);
                        const sectionCount = course.sections ?? 1;
                        const allScheduled = !!assignmentId;
                        const preassignedInstructorId = courseInstructorPreassignments[course.id];
                        const isPreassigned = !assignmentId && preassignedInstructorId === faculty.id;
                        const canDrag = !allScheduled;
                        const sectionsLeft = sectionCount - scheduledCount;
                        const assignment = assignmentId
                          ? assignments.find((a) => a.id === assignmentId && !a.isShadow)
                          : undefined;
                        const roomTimeLabel = assignment ? getRoomTimeLabel(assignment) : undefined;

                        return (
                          <div key={`${course.id}-${faculty.id}-${idx}`} className="min-w-0">
                            <CourseTile
                              course={course}
                              instructor={allScheduled ? undefined : faculty}
                              instructors={facultyRoster}
                              assignmentId={assignmentId ?? course.id}
                              prefixBorderClass={getPrefixColor(course.prefix).border}
                              prefixBorderMutedClass={allScheduled ? getPrefixColor(course.prefix).borderMuted : undefined}
                              prefixFillClass={allScheduled ? getPrefixColor(course.prefix).fill : undefined}
                              instructorCourseCount={instructorWorkload[faculty.id] ?? 0}
                              instructorMaxWorkload={faculty.maxWorkload ?? 3}
                              onInstructorChange={
                                isPreassigned && !allScheduled
                                  ? (_, instructorId) => onInstructorPreassign(course.id, instructorId)
                                  : undefined
                              }
                              onAssignInstructor={undefined}
                              badge={
                                allScheduled ? undefined : isPreassigned && sectionsLeft > 0 ? (
                                  <Badge variant="secondary" className="text-xs shrink-0">
                                    {sectionsLeft}/{sectionCount} left
                                  </Badge>
                                ) : undefined
                              }
                              scheduledLabel={
                                allScheduled ? roomTimeLabel : undefined
                              }
                              showCheckInsteadOfGrip={allScheduled}
                              isInstructorAtCapacity={isInstructorAtCapacity}
                              instructorWorkload={instructorWorkload}
                              maxInstructorLoad={MAX_INSTRUCTOR_LOAD}
                              draggable={canDrag}
                            />
                          </div>
                        );
                      })
                      )}
                    </div>
                    </div>
                  </div>
                );
              })}
              {(instructorGroups["__unassigned__"] ?? []).length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Unassigned</span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {instructorGroups["__unassigned__"].length}
                    </Badge>
                  </div>
                  <div className="rounded-md bg-muted/20 p-2">
                    <div className="flex flex-col gap-1">
                    {instructorGroups["__unassigned__"].map(({ course }, idx) => {
                      const scheduledCount = getScheduledCountForCourse(course.id);
                      const sectionCount = course.sections ?? 1;
                      const allScheduled = scheduledCount >= sectionCount;
                      const canDrag = !allScheduled;

                      return (
                        <div key={`unassigned-${course.id}-${idx}`} className="min-w-0">
                          <CourseTile
                            course={course}
                            instructor={undefined}
                            instructors={facultyRoster}
                            assignmentId={course.id}
                            prefixBorderClass={getPrefixColor(course.prefix).border}
                            prefixBorderMutedClass={allScheduled ? getPrefixColor(course.prefix).borderMuted : undefined}
                            prefixFillClass={allScheduled ? getPrefixColor(course.prefix).fill : undefined}
                            onAssignInstructor={
                              !allScheduled
                                ? (instructorId) => onInstructorPreassign(course.id, instructorId)
                                : undefined
                            }
                            badge={undefined}
                            isInstructorAtCapacity={isInstructorAtCapacity}
                            instructorWorkload={instructorWorkload}
                            maxInstructorLoad={MAX_INSTRUCTOR_LOAD}
                            draggable={canDrag}
                          />
                        </div>
                      );
                    })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </ScrollArea>
      <AddCourseModal
        instructor={addCourseInstructor}
        open={!!addCourseInstructor}
        assignments={assignments}
        prefixFilter={prefixFilter}
        onOpenChange={(open) => !open && setAddCourseInstructor(null)}
        onStartPlacement={onStartPlacement ?? (() => {})}
      />
      <AlertDialog
        open={!!workloadAtCapacityInstructor}
        onOpenChange={(open) => !open && setWorkloadAtCapacityInstructor(null)}
      >
        <AlertDialogContent className="bg-white dark:bg-zinc-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Instructor at capacity</AlertDialogTitle>
            <AlertDialogDescription>
              {workloadAtCapacityInstructor?.name} has already hit their required courseload (
              {(instructorWorkload[workloadAtCapacityInstructor?.id ?? ""] ?? 0)}/
              {workloadAtCapacityInstructor?.maxWorkload ?? 3} courses on the grid). You cannot add
              more courses to this instructor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button
              type="button"
              onClick={() => {
                if (workloadAtCapacityInstructor) {
                  setAddCourseInstructor(workloadAtCapacityInstructor);
                }
                setWorkloadAtCapacityInstructor(null);
              }}
              className="rounded-md px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Override
            </button>
            <AlertDialogCancel className="border border-input">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Tabs>
  );
}
