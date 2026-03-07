import { AuthBrandPanel } from "@/features/auth/components/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:h-screen lg:overflow-hidden grid lg:grid-cols-[9fr_11fr]">
      {/* Left — brand panel (desktop only) */}
      <div className="hidden lg:flex lg:h-full">
        <AuthBrandPanel />
      </div>

      {/* Right — form area */}
      <div className="bg-white min-h-screen lg:h-full lg:overflow-y-auto flex items-center justify-center px-8 py-12 sm:px-12">
        <div className="w-full max-w-100">{children}</div>
      </div>
    </div>
  );
}
