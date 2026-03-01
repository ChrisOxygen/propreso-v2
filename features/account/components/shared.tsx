import type { ReactNode, CSSProperties } from "react";

export function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div
      className="px-5 py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <h2
        className="text-[13.5px] font-semibold"
        style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-0.5 text-[12px]" style={{ color: "rgba(251,247,243,0.35)" }}>
          {description}
        </p>
      )}
    </div>
  );
}

export function inputStyle(hasError = false): CSSProperties {
  return {
    background: "rgba(255,255,255,0.04)",
    border: hasError
      ? "1px solid rgba(200,73,26,0.5)"
      : "1px solid rgba(255,255,255,0.09)",
    color: "#FBF7F3",
    outline: "none",
  };
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-[11.5px]" style={{ color: "rgba(200,73,26,0.9)" }}>
      {msg}
    </p>
  );
}
