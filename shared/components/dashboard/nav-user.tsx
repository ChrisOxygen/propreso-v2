"use client";

import { useRouter } from "next/navigation";
import { Settings, CreditCard, LogOut, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { createClient } from "@/shared/lib/supabase/client";

interface NavUserProps {
  user: {
    name: string;
    email: string;
  };
}

export function NavUser({ user }: NavUserProps) {
  const router = useRouter();
  const initials = user.email.slice(0, 2).toUpperCase();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  return (
    <div className="border-t border-border pt-3 mt-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-accent transition-colors text-left">
            <Avatar className="h-7 w-7 rounded-lg shrink-0">
              <AvatarFallback className="rounded-lg text-[11px] font-semibold bg-accent text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight min-w-0">
              <span
                className="truncate text-[13px] font-medium text-foreground"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {user.name}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {user.email}
              </span>
            </div>
            <ChevronUp className="size-3.5 shrink-0 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-52 rounded-xl"
          side="top"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2.5 px-2 py-2">
              <Avatar className="h-7 w-7 rounded-lg shrink-0">
                <AvatarFallback className="rounded-lg text-[11px] font-semibold bg-accent text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-[13px] font-medium text-foreground">
                  {user.name}
                </span>
                <span className="truncate text-[11px] text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <a href="/account">
                <Settings className="size-4" />
                Account
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/billing">
                <CreditCard className="size-4" />
                Billing
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
