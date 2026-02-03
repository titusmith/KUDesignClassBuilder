import type { Conflict } from "@/data/schedulerTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback, useEffect } from "react";

const JEREMY_SHELLHORN_EMAIL = "jshellhorn@ku.edu";

interface ResolutionModalProps {
  conflict: Conflict | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function buildEmailBody(conflict: Conflict): string {
  const lines = [
    `Fall 2026 Schedule — ${conflict.type === "instructor" ? "Instructor" : "Room/Time"} Conflict`,
    "",
    `Room: ${conflict.room.code}`,
    `Time Block: ${conflict.timeBlock.label}`,
  ];

  if (conflict.existingCourse && conflict.existingInstructor) {
    lines.push(
      "",
      `Currently assigned: ${conflict.existingCourse.code} (Instructor: ${conflict.existingInstructor.name})`
    );
  }

  if (conflict.proposedInstructor) {
    lines.push(
      "",
      `Proposed assignment: ${conflict.proposedCourse.code} (Instructor: ${conflict.proposedInstructor.name})`
    );
  } else {
    lines.push("", `Proposed assignment: ${conflict.proposedCourse.code}`);
  }

  lines.push(
    "",
    "Please review and advise on resolution.",
    "",
    "— KU Design Scheduler"
  );

  return lines.join("\n");
}

function buildEmailSubject(conflict: Conflict): string {
  return `Fall 2026 Schedule — ${conflict.type === "instructor" ? "Instructor" : "Room/Time"} Conflict`;
}

function getRecipientEmails(conflict: Conflict): string[] {
  const emails: string[] = [JEREMY_SHELLHORN_EMAIL];
  if (conflict.existingInstructor?.email) {
    emails.unshift(conflict.existingInstructor.email);
  }
  return emails;
}

export function ResolutionModal({
  conflict,
  open,
  onOpenChange,
}: ResolutionModalProps) {
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    if (conflict && open) {
      setEmailBody(buildEmailBody(conflict));
    } else if (!open) {
      setEmailBody("");
    }
  }, [conflict, open]);

  const handleCopy = useCallback(() => {
    if (!conflict) return;
    const subject = buildEmailSubject(conflict);
    const body = emailBody;
    const full = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(full);
  }, [conflict, emailBody]);

  const handleMailto = useCallback(() => {
    if (!conflict) return;
    const recipients = getRecipientEmails(conflict);
    const subject = encodeURIComponent(buildEmailSubject(conflict));
    const body = encodeURIComponent(emailBody);
    const mailto = `mailto:${recipients.join(",")}?subject=${subject}&body=${body}`;
    window.open(mailto);
  }, [conflict, emailBody]);

  const handleClose = useCallback(() => {
    setEmailBody("");
    onOpenChange(false);
  }, [onOpenChange]);

  if (!conflict) return null;

  const title =
    conflict.type === "instructor"
      ? "Conflict: Instructor Double-Booked"
      : "Conflict: Room/Time Overlap";

  const existingInfo =
    conflict.existingCourse && conflict.existingInstructor
      ? `${conflict.existingCourse.code} (Instructor: ${conflict.existingInstructor.name})`
      : "another course";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {conflict.room.code} • {conflict.timeBlock.label} is already assigned
            to {existingInfo}.
            {conflict.proposedInstructor && (
              <>
                {" "}
                Proposed: {conflict.proposedCourse.code} (Instructor:{" "}
                {conflict.proposedInstructor.name})
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            To: {conflict.existingInstructor?.name || "Instructor"}, Jeremy
            Shellhorn
          </p>
          <p className="text-sm text-muted-foreground">
            Subject: Fall 2026 Schedule —{" "}
            {conflict.type === "instructor" ? "Instructor" : "Room/Time"} Conflict
          </p>
          <Textarea
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            placeholder="Email body..."
            className="min-h-[120px] resize-none"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
          <Button onClick={handleMailto}>Send via Mailto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
