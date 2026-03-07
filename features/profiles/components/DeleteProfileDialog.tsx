"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useDeleteProfile } from "@/features/profiles/hooks/use-delete-profile";
import { Loader2 } from "lucide-react";

interface DeleteProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  profileName: string;
}

export function DeleteProfileDialog({
  open,
  onOpenChange,
  profileId,
  profileName,
}: DeleteProfileDialogProps) {
  const deleteProfile = useDeleteProfile();

  function handleConfirm() {
    deleteProfile.mutate(profileId, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[15px] font-semibold font-heading text-foreground">
            Delete &ldquo;{profileName}&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
            This profile will be permanently deleted. Proposals generated with
            it will remain in your history, but won&apos;t be linked to a
            profile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-[13px] h-9 bg-background border border-border text-text-secondary hover:bg-muted"
            disabled={deleteProfile.isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-[13px] h-9 font-semibold bg-error-subtle border border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={handleConfirm}
            disabled={deleteProfile.isPending}
          >
            {deleteProfile.isPending ? (
              <Loader2 size={13} className="animate-spin mr-1.5" />
            ) : null}
            Delete Profile
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
