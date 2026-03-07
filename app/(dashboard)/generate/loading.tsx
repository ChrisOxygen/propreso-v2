export default function GenerateLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-4 w-20 rounded mb-4 animate-pulse bg-border" />
        <div className="h-7 w-40 rounded-lg mb-2 animate-pulse bg-border" />
        <div className="h-4 w-72 rounded animate-pulse bg-border" />
      </div>

      {/* Two-panel skeleton */}
      <div className="flex flex-col lg:grid lg:grid-cols-[420px_1fr] gap-6">
        {/* Left: form skeleton */}
        <div className="rounded-xl p-5 flex flex-col gap-5 bg-card border border-border">
          {/* Profile row */}
          <div>
            <div className="h-3 w-14 rounded mb-2.5 animate-pulse bg-border" />
            <div className="h-10 rounded-lg animate-pulse bg-accent" />
          </div>

          <div className="h-px bg-border" />

          {/* Job fields */}
          <div className="flex flex-col gap-4">
            <div className="h-3 w-20 rounded animate-pulse bg-border" />
            <div className="h-9 rounded-lg animate-pulse bg-accent" />
            <div className="h-9 rounded-lg animate-pulse bg-accent" />
            <div className="h-40 rounded-lg animate-pulse bg-accent" />
          </div>

          <div className="h-px bg-border" />

          {/* Options skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-3 w-28 rounded animate-pulse bg-border" />
            <div className="grid grid-cols-2 gap-1.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 rounded-lg animate-pulse bg-accent" />
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-9 rounded-lg animate-pulse bg-accent" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 rounded-lg animate-pulse bg-accent" />
              ))}
            </div>
            <div className="h-14 rounded-lg animate-pulse bg-accent" />
          </div>

          {/* CTA */}
          <div className="h-11 rounded-xl animate-pulse bg-primary/15" />
        </div>

        {/* Right: output skeleton */}
        <div className="rounded-xl animate-pulse bg-accent/40 border border-dashed border-border-strong min-h-85" />
      </div>
    </div>
  );
}
