// Shown immediately when navigating to /dashboard while server data fetches
export default function DashboardLoading() {
  return (
    <div className="px-2 space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl p-4 bg-card border border-border flex flex-col gap-3 animate-pulse"
          >
            <div className="w-8 h-8 rounded-lg bg-accent" />
            <div>
              <div className="h-7 rounded-md w-14 bg-border" />
              <div className="h-3 rounded w-20 mt-2 bg-accent" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl h-16 animate-pulse bg-primary/10 border border-primary/20" />
        <div className="rounded-xl h-16 animate-pulse bg-card border border-border" />
      </div>

      {/* Recent proposals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="h-3.5 rounded w-32 bg-border animate-pulse" />
          <div className="h-3 rounded w-12 bg-accent animate-pulse" />
        </div>
        <div className="rounded-xl overflow-hidden border border-border">
          {[1, 2, 3, 4, 5].map((i, idx, arr) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 bg-card animate-pulse${idx < arr.length - 1 ? " border-b border-border" : ""}`}
            >
              <div>
                <div className="h-3.5 rounded w-52 bg-border" />
                <div className="h-3 rounded w-32 mt-1.5 bg-accent" />
              </div>
              <div className="h-5 rounded-full w-16 shrink-0 bg-accent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
