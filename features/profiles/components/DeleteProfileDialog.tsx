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
      <AlertDialogContent
        style={{
          background: "#16100A",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#FBF7F3",
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className="text-[15px] font-semibold"
            style={{
              color: "#FBF7F3",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Delete &ldquo;{profileName}&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-[13px] leading-relaxed"
            style={{ color: "rgba(251,247,243,0.45)" }}
          >
            This profile will be permanently deleted. Proposals generated with
            it will remain in your history, but won&apos;t be linked to a
            profile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-[13px] h-9"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(251,247,243,0.7)",
            }}
            disabled={deleteProfile.isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-[13px] h-9 font-semibold"
            style={{
              background: "rgba(220,53,53,0.15)",
              border: "1px solid rgba(220,53,53,0.3)",
              color: "#E57373",
            }}
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
