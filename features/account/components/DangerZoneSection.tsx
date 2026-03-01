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
        <AlertDialogContent
          style={{
            background: "#1A1410",
            border: "1px solid rgba(200,73,26,0.25)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "#FBF7F3" }}>
              Delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription
              className="flex flex-col gap-3"
              style={{ color: "rgba(251,247,243,0.45)" }}
            >
              <span>
                This will permanently delete your account, all your freelancer profiles, and your
                entire proposal history. This action{" "}
                <span style={{ color: "rgba(251,247,243,0.7)" }}>cannot be undone.</span>
              </span>
              <span>
                Type{" "}
                <span
                  className="font-mono text-[12px] px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(200,73,26,0.12)",
                    color: "#E06030",
                    border: "1px solid rgba(200,73,26,0.2)",
                  }}
                >
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
            className="w-full h-9 px-3.5 rounded-lg text-[13px] font-mono mt-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: canConfirm
                ? "1px solid rgba(200,73,26,0.4)"
                : "1px solid rgba(255,255,255,0.09)",
              color: "#FBF7F3",
              outline: "none",
            }}
          />

          <AlertDialogFooter>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirmText("");
              }}
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-[12.5px] font-medium transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(251,247,243,0.7)",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!canConfirm || deleteAccount.isPending}
              className="inline-flex items-center gap-1.5 justify-center h-9 px-4 rounded-lg text-[12.5px] font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "rgba(239,68,68,0.9)",
                fontFamily: "var(--font-space-grotesk)",
              }}
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
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(200,73,26,0.03)",
          border: "1px solid rgba(200,73,26,0.2)",
        }}
      >
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid rgba(200,73,26,0.12)" }}
        >
          <h2
            className="text-[13.5px] font-semibold"
            style={{ color: "rgba(239,68,68,0.85)", fontFamily: "var(--font-space-grotesk)" }}
          >
            Danger zone
          </h2>
          <p className="mt-0.5 text-[12px]" style={{ color: "rgba(251,247,243,0.35)" }}>
            Irreversible and destructive actions.
          </p>
        </div>
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium" style={{ color: "#FBF7F3" }}>
              Delete account
            </p>
            <p className="text-[12px] mt-0.5" style={{ color: "rgba(251,247,243,0.35)" }}>
              Permanently removes your account, all profiles, and all proposals.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-medium transition-all duration-150"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "rgba(239,68,68,0.8)",
            }}
          >
            <Trash2 size={12} />
            Delete account
          </button>
        </div>
      </div>
    </>
  );
}
