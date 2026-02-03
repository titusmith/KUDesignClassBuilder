import { useState } from "react";
import { Command as CmdkCommand } from "cmdk";
import type { Faculty } from "@/data/schedulerTypes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstructorComboboxProps {
  instructors: Faculty[];
  value?: string;
  onSelect: (instructorId: string) => void;
  isInstructorAtCapacity?: (instructorId: string) => boolean;
  instructorWorkload?: Record<string, number>;
  maxLoad?: number;
  placeholder?: string;
  /** When provided, overrides the default capacity message for disabled instructors */
  getDisabledMessage?: (instructorId: string) => string | undefined;
}

export function InstructorCombobox({
  instructors,
  value,
  onSelect,
  isInstructorAtCapacity,
  instructorWorkload = {},
  maxLoad = 5,
  placeholder = "Search instructors...",
  getDisabledMessage,
}: InstructorComboboxProps) {
  const [search, setSearch] = useState("");
  const [pendingOverloadConfirmId, setPendingOverloadConfirmId] = useState<string | null>(null);

  const handleSelect = (instructorId: string) => {
    const instructor = instructors.find((i) => i.id === instructorId);
    const count = instructorWorkload[instructorId] ?? 0;
    const expectedLoad = instructor?.maxWorkload ?? 3;
    const atExpectedLoad = count >= expectedLoad && count < maxLoad;

    if (atExpectedLoad) {
      setPendingOverloadConfirmId(instructorId);
    } else {
      onSelect(instructorId);
    }
  };

  const handleOverloadConfirm = () => {
    if (pendingOverloadConfirmId) {
      onSelect(pendingOverloadConfirmId);
      setPendingOverloadConfirmId(null);
    }
  };

  const pendingInstructor = pendingOverloadConfirmId
    ? instructors.find((i) => i.id === pendingOverloadConfirmId)
    : undefined;
  const pendingExpectedLoad = pendingInstructor?.maxWorkload ?? 3;

  return (
    <>
    <Command
      value={search}
      onValueChange={setSearch}
      className="rounded-lg border-0 bg-transparent shadow-none"
    >
      <div className="flex items-center gap-1 border-b px-2 pb-2" cmdk-input-wrapper="">
        {search ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 cursor-pointer"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        )}
        <CmdkCommand.Input
          placeholder={placeholder}
          className="flex h-8 flex-1 rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <CommandList className="max-h-[200px] p-1">
        <CommandEmpty>No instructor found.</CommandEmpty>
        <CommandGroup>
          {instructors.map((f) => {
            const atCapacity = isInstructorAtCapacity?.(f.id) ?? false;
            const customMessage = getDisabledMessage?.(f.id);
            const disabledMessage = customMessage ?? (atCapacity
              ? ` (${instructorWorkload[f.id] ?? 0}/${maxLoad} at capacity)`
              : "");
            const isSelected = value === f.id;
            return (
              <CommandItem
                key={f.id}
                value={f.name}
                disabled={atCapacity}
                onSelect={() => {
                  if (!atCapacity) {
                    handleSelect(f.id);
                  }
                }}
                className={cn(atCapacity && "opacity-50", isSelected && "font-semibold")}
              >
                {f.name}
                {atCapacity && disabledMessage}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>

    <AlertDialog
      open={!!pendingOverloadConfirmId}
      onOpenChange={(open) => !open && setPendingOverloadConfirmId(null)}
    >
      <AlertDialogContent className="bg-white dark:bg-zinc-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Instructor at capacity</AlertDialogTitle>
          <AlertDialogDescription>
            {pendingInstructor?.name} has already hit their required courseload (
            {(instructorWorkload[pendingInstructor?.id ?? ""] ?? 0)}/
            {pendingExpectedLoad} courses on the grid). You cannot add more courses to
            this instructor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button
            type="button"
            onClick={() => {
              handleOverloadConfirm();
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
  </>
  );
}
