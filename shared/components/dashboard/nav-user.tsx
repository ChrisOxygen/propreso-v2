"use client";

import { useRouter } from "next/navigation";
import { ChevronsUpDown, Settings, CreditCard, LogOut } from "lucide-react";
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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { createClient } from "@/shared/lib/supabase/client";

interface NavUserProps {
  user: {
    name: string;
    email: string;
  };
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const initials = user.email.slice(0, 2).toUpperCase();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="text-[rgba(251,247,243,0.7)] hover:bg-white/5 hover:text-[rgba(251,247,243,0.9)] data-[state=open]:bg-white/5 data-[state=open]:text-[rgba(251,247,243,0.9)]"
            >
              <Avatar className="h-7 w-7 rounded-lg shrink-0">
                <AvatarFallback
                  className="rounded-lg text-[11px] font-semibold"
                  style={{
                    background: "rgba(200,73,26,0.18)",
                    color: "#E85A2C",
                  }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span
                  className="truncate text-[13px] font-medium text-[rgba(251,247,243,0.85)]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {user.name}
                </span>
                <span
                  className="truncate text-[11px] text-[rgba(251,247,243,0.4)]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-3.5 shrink-0 text-[rgba(251,247,243,0.3)]" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="dark w-[--radix-dropdown-menu-trigger-width] min-w-52 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2.5 px-2 py-2">
                <Avatar className="h-7 w-7 rounded-lg shrink-0">
                  <AvatarFallback
                    className="rounded-lg text-[11px] font-semibold"
                    style={{
                      background: "rgba(200,73,26,0.18)",
                      color: "#E85A2C",
                    }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-[13px] font-medium">
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
