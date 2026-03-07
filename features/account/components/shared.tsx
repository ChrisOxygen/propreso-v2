import type { ReactNode } from "react";

export function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border">
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
    <div className="px-5 py-4 border-b border-border">
      <h2 className="text-[13.5px] font-semibold font-heading text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-0.5 text-[12px] text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function fieldClass(hasError = false) {
  return [
    "w-full px-3.5 rounded-lg text-[13px] text-foreground bg-background",
    "border outline-none transition-colors duration-150",
    "placeholder:text-muted-foreground",
    "focus:border-primary focus:ring-2 focus:ring-primary/10",
    hasError ? "border-destructive" : "border-border",
  ].join(" ");
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-[11.5px] text-destructive">{msg}</p>
  );
}
