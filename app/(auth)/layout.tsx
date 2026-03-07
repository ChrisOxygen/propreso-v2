import { AuthBrandPanel } from "@/features/auth/components/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDF8F6] flex items-center justify-center p-0 lg:p-10">
      <div className="w-full max-w-240 overflow-hidden lg:rounded-4xl lg:shadow-[0_8px_48px_rgba(0,0,0,0.10)] grid lg:grid-cols-[9fr_11fr]">
        {/* Left — brand panel (desktop only) */}
        <div className="hidden lg:block">
          <AuthBrandPanel />
        </div>

        {/* Right — form area */}
        <div className="bg-white min-h-screen lg:min-h-160 flex items-center justify-center px-8 py-12 sm:px-12">
          <div className="w-full max-w-100">{children}</div>
        </div>
      </div>
    </div>
  );
}
