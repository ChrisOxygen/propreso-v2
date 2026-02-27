export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ backgroundColor: "#0F0A05" }}
    >
      {/* Subtle radial glow behind content */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,73,26,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
