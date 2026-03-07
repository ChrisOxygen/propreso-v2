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
