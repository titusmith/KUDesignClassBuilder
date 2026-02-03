import type { DayPattern } from "@/data/schedulerTypes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { facultyRoster } from "@/data/facultyRoster";

const DAY_PATTERN_OPTIONS: { value: DayPattern; label: string }[] = [
  { value: "MW", label: "Mon/Wed" },
  { value: "TTh", label: "Tues/Thurs" },
  { value: "Evening", label: "Evening" },
];

interface FocusModeBarProps {
  focusModeEnabled: boolean;
  onFocusModeChange: (enabled: boolean) => void;
  dayPatternFilter: "all" | DayPattern;
  onDayPatternFilterChange: (value: "all" | DayPattern) => void;
  prefixFilter: string[];
  onPrefixFilterChange: (prefixes: string[]) => void;
  prefixOptions: string[];
  instructorFilter: string[];
  onInstructorFilterChange: (instructorIds: string[]) => void;
  instructorOptions: string[];
}

export function FocusModeBar({
  focusModeEnabled,
  onFocusModeChange,
  dayPatternFilter,
  onDayPatternFilterChange,
  prefixFilter,
  onPrefixFilterChange,
  prefixOptions,
  instructorFilter,
  onInstructorFilterChange,
  instructorOptions,
}: FocusModeBarProps) {
  const dayPatternSummary =
    dayPatternFilter === "all"
      ? "All"
      : DAY_PATTERN_OPTIONS.find((opt) => opt.value === dayPatternFilter)?.label ?? dayPatternFilter;
  const allPrefixesSelected = prefixFilter.length === prefixOptions.length;
  const prefixSummary = allPrefixesSelected
    ? "All"
    : prefixFilter.length === 0
      ? "None selected"
      : prefixFilter.join(", ");
  const allInstructorsSelected = instructorFilter.length === instructorOptions.length;
  const instructorSummary = allInstructorsSelected
    ? "All"
    : instructorFilter.length === 0
      ? "None selected"
      : instructorFilter
          .map((id) => facultyRoster.find((f) => f.id === id)?.name ?? id)
          .join(", ");

  const handleResetFilters = () => {
    onDayPatternFilterChange("all");
    onPrefixFilterChange([...prefixOptions]);
    onInstructorFilterChange([...instructorOptions]);
  };

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "text-xs font-semibold uppercase tracking-wide border-2 transition-colors",
          focusModeEnabled
            ? "border-input bg-muted text-foreground"
            : "border-transparent text-muted-foreground hover:border-input hover:text-foreground"
        )}
        onClick={() => onFocusModeChange(!focusModeEnabled)}
      >
        Focus mode
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            disabled={!focusModeEnabled}
            className={cn(
              "min-w-[140px] justify-start gap-2 bg-muted text-foreground",
              !focusModeEnabled && "opacity-50"
            )}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Day
            </span>
            <span className="text-sm font-medium text-foreground/80">{dayPatternSummary}</span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 border border-border bg-white text-foreground"
          align="end"
        >
          <DropdownMenuCheckboxItem
            checked={dayPatternFilter === "all"}
            onCheckedChange={(checked) => checked && onDayPatternFilterChange("all")}
          >
            All
          </DropdownMenuCheckboxItem>
          {DAY_PATTERN_OPTIONS.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={dayPatternFilter === option.value}
              onCheckedChange={(checked) => checked && onDayPatternFilterChange(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            disabled={!focusModeEnabled}
            className={cn(
              "min-w-[180px] justify-start gap-2 bg-muted text-foreground",
              !focusModeEnabled && "opacity-50"
            )}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground shrink-0">
              Programs
            </span>
            <span className="text-sm font-medium text-foreground/80 truncate min-w-0">{prefixSummary}</span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 border border-border bg-white text-foreground"
          align="end"
        >
          <DropdownMenuCheckboxItem
            checked={allPrefixesSelected}
            onCheckedChange={(checked) =>
              checked && onPrefixFilterChange([...prefixOptions])
            }
          >
            All
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          {prefixOptions.map((prefix) => (
            <DropdownMenuCheckboxItem
              key={prefix}
              checked={!allPrefixesSelected && prefixFilter.includes(prefix)}
              onCheckedChange={(checked) => {
                if (allPrefixesSelected) {
                  onPrefixFilterChange(checked ? [prefix] : [...prefixOptions]);
                } else {
                  const next = new Set(prefixFilter);
                  if (checked) {
                    next.add(prefix);
                  } else {
                    next.delete(prefix);
                  }
                  const ordered = prefixOptions.filter((p) => next.has(p));
                  onPrefixFilterChange(
                    ordered.length > 0 ? ordered : [...prefixOptions]
                  );
                }
              }}
            >
              {prefix}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            disabled={!focusModeEnabled}
            className={cn(
              "min-w-[180px] justify-start gap-2 bg-muted text-foreground",
              !focusModeEnabled && "opacity-50"
            )}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground shrink-0">
              Instructors
            </span>
            <span className="text-sm font-medium text-foreground/80 truncate min-w-0">{instructorSummary}</span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 border border-border bg-white text-foreground"
          align="end"
        >
          <DropdownMenuCheckboxItem
            checked={allInstructorsSelected}
            onCheckedChange={(checked) =>
              checked && onInstructorFilterChange([...instructorOptions])
            }
          >
            All
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          {instructorOptions.map((instructorId) => {
            const instructor = facultyRoster.find((f) => f.id === instructorId);
            return (
              <DropdownMenuCheckboxItem
                key={instructorId}
                checked={!allInstructorsSelected && instructorFilter.includes(instructorId)}
                onCheckedChange={(checked) => {
                  if (allInstructorsSelected) {
                    onInstructorFilterChange(checked ? [instructorId] : [...instructorOptions]);
                  } else {
                    const next = new Set(instructorFilter);
                    if (checked) {
                      next.add(instructorId);
                    } else {
                      next.delete(instructorId);
                    }
                    const ordered = instructorOptions.filter((id) => next.has(id));
                    onInstructorFilterChange(
                      ordered.length > 0 ? ordered : [...instructorOptions]
                    );
                  }
                }}
              >
                {instructor?.name ?? instructorId}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        size="sm"
        disabled={!focusModeEnabled}
        onClick={handleResetFilters}
        className={cn(
          "h-8 w-8 p-0",
          !focusModeEnabled && "opacity-50"
        )}
        title="Reset all filters to 'All'"
      >
        <RotateCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
