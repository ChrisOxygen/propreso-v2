import { AuthBrandPanel } from "@/features/auth/components/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen grid lg:grid-cols-2"
      style={{ backgroundColor: "#0F0A05" }}
    >
      {/* Left — brand panel (desktop only) */}
      <div className="hidden lg:block">
        <AuthBrandPanel />
      </div>

      {/* Right — form area */}
      <div
        className="flex items-center justify-center min-h-screen px-6 py-12"
        style={{ backgroundColor: "#120B06" }}
      >
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
