"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useDeleteAccount } from "@/features/account/hooks/use-delete-account";

export function DangerZoneSection() {
  const router = useRouter();
  const deleteAccount = useDeleteAccount();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const CONFIRM_WORD = "DELETE";
  const canConfirm = confirmText === CONFIRM_WORD;

  async function handleDelete() {
    try {
      await deleteAccount.mutateAsync();
      // Sign out from client side after server deletion
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/sign-in");
    } catch {
      toast.error("Failed to delete account. Please try again.");
      setOpen(false);
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-card border border-destructive/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground font-heading">
              Delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-3 text-muted-foreground">
              <span>
                This will permanently delete your account, all your freelancer profiles, and your
                entire proposal history. This action{" "}
                <span className="text-foreground font-medium">cannot be undone.</span>
              </span>
              <span>
                Type{" "}
                <span className="font-mono text-[12px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  DELETE
                </span>{" "}
                to confirm.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className={`w-full h-9 px-3.5 rounded-lg text-[13px] font-mono mt-1 bg-background text-foreground outline-none border transition-colors duration-150 placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/10 ${
              canConfirm ? "border-primary" : "border-border"
            }`}
          />

          <AlertDialogFooter>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirmText("");
              }}
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-[12.5px] font-medium transition-all duration-150 bg-background border border-border text-text-secondary hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!canConfirm || deleteAccount.isPending}
              className="inline-flex items-center gap-1.5 justify-center h-9 px-4 rounded-lg text-[12.5px] font-semibold font-heading transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed bg-error-subtle border border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              {deleteAccount.isPending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Trash2 size={12} />
              )}
              {deleteAccount.isPending ? "Deleting…" : "Delete account"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Danger Zone card */}
      <div className="rounded-xl overflow-hidden bg-error-subtle border border-destructive/20">
        <div className="px-5 py-4 border-b border-destructive/15">
          <h2 className="text-[13.5px] font-semibold font-heading text-destructive">
            Danger zone
          </h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            Irreversible and destructive actions.
          </p>
        </div>
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-foreground">Delete account</p>
            <p className="text-[12px] mt-0.5 text-muted-foreground">
              Permanently removes your account, all profiles, and all proposals.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-medium transition-all duration-150 bg-error-subtle border border-destructive/25 text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={12} />
            Delete account
          </button>
        </div>
      </div>
    </>
  );
}
