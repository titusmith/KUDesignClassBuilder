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

interface LinkedRoomSuggestionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  primaryRoomCode: string;
  pairedRoomCode: string;
  courseCode: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

export function LinkedRoomSuggestion({
  open,
  onOpenChange,
  primaryRoomCode,
  pairedRoomCode,
  courseCode,
  onConfirm,
  onDismiss,
}: LinkedRoomSuggestionProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleDismiss = () => {
    onDismiss();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add paired room?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium">{primaryRoomCode}</span> has a paired
            room: <span className="font-medium">{pairedRoomCode}</span>.
            <br />
            <br />
            Add {pairedRoomCode} as a paired room for {courseCode}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDismiss}>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
