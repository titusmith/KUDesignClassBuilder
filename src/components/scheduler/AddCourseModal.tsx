import { useState, useMemo } from "react";
import { Command as CmdkCommand } from "cmdk";
import type { Course, Faculty, ScheduleAssignment } from "@/data/schedulerTypes";
import { courseRegistry } from "@/data/courseRegistry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { getPrefixColor } from "@/data/prefixColors";

interface AddCourseModalProps {
  instructor: Faculty | null;
  open: boolean;
  assignments: ScheduleAssignment[];
  prefixFilter?: string;
  onOpenChange: (open: boolean) => void;
  /** Called when user selects a course - closes modal and enters placement mode on grid */
  onStartPlacement: (courseId: string, instructorId: string) => void;
}

export function AddCourseModal({
  instructor,
  open,
  assignments,
  prefixFilter = "",
  onOpenChange,
  onStartPlacement,
}: AddCourseModalProps) {
  const [search, setSearch] = useState("");

  const availableCourses = useMemo(() => {
    const getScheduled = (courseId: string) =>
      assignments.filter((a) => a.courseId === courseId && !a.isShadow).length;

    return courseRegistry
      .filter((c) => !c.isApptOrOnline)
      .filter((c) => !prefixFilter || c.prefix === prefixFilter)
      .filter((c) => {
        const scheduled = getScheduled(c.id);
        const sectionCount = c.sections ?? 1;
        return scheduled < sectionCount;
      });
  }, [assignments, prefixFilter]);

  const handleSelectCourse = (course: Course) => {
    if (instructor) {
      onStartPlacement(course.id, instructor.id);
      onOpenChange(false);
      setSearch("");
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setSearch("");
    onOpenChange(next);
  };

  if (!instructor) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg bg-white dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Add course to {instructor.name}</DialogTitle>
          <DialogDescription>
            Select a course, then click an empty cell on the grid to place it. Press ESC to cancel.
          </DialogDescription>
        </DialogHeader>

        <Command className="rounded-lg" value={search} onValueChange={setSearch}>
            <div className="flex items-center gap-1 border-b px-2 pb-2" cmdk-input-wrapper="">
              {search ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              )}
              <CmdkCommand.Input
                placeholder="Search courses..."
                className="flex h-8 flex-1 rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <CommandList className="max-h-[280px]">
              <CommandEmpty>No courses available to add.</CommandEmpty>
              <CommandGroup heading="Courses needing scheduling">
                {availableCourses.map((course) => {
                  const scheduled = assignments.filter(
                    (a) => a.courseId === course.id && !a.isShadow
                  ).length;
                  const sectionCount = course.sections ?? 1;
                  const left = sectionCount - scheduled;
                  return (
                    <CommandItem
                      key={course.id}
                      value={`${course.code} ${course.prefix}`}
                      onSelect={() => handleSelectCourse(course)}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${getPrefixColor(course.prefix).dot}`}
                          aria-hidden
                        />
                        {course.code}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {left}/{sectionCount} left
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
      </DialogContent>
    </Dialog>
  );
}

