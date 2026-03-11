export default function ProposalDetailLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl">
      {/* Back link */}
      <div className="h-3 rounded w-28 mb-5 bg-accent animate-pulse" />

      {/* Title */}
      <div className="h-7 rounded w-3/4 bg-border animate-pulse" />
      <div className="h-7 rounded w-1/2 mt-2 bg-accent animate-pulse" />

      {/* Meta row */}
      <div className="flex items-center gap-2 mt-3 mb-5">
        <div className="h-3 rounded w-24 bg-accent animate-pulse" />
        <div className="h-5 rounded w-12 bg-accent animate-pulse" />
        <div className="h-5 rounded w-14 bg-accent animate-pulse" />
        <div className="h-3 rounded w-20 bg-accent animate-pulse" />
      </div>

      {/* Status bar */}
      <div className="flex gap-1.5 pt-3 mt-3 border-t border-border">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-7 rounded-md bg-accent animate-pulse" />
        ))}
      </div>

      {/* Content block */}
      <div className="rounded-xl p-5 sm:p-6 mt-5 bg-card border border-border animate-pulse">
        <div className="h-3 rounded w-28 mb-4 bg-border" />
        <div className="space-y-2.5">
          {[100, 92, 85, 100, 78, 95, 60].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded bg-accent"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
