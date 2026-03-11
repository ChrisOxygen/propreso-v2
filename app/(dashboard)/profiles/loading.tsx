export default function ProfilesLoading() {
  return (
    <div className="px-2">
      {/* Profile cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl p-5 bg-card border border-border animate-pulse"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="h-5 rounded w-32 bg-border" />
              <div className="h-5 rounded-full w-16 bg-accent" />
            </div>
            <div className="space-y-2">
              <div className="h-3 rounded w-full bg-accent" />
              <div className="h-3 rounded w-3/4 bg-accent" />
            </div>
            <div className="flex gap-1.5 mt-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-5 rounded w-12 bg-accent" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
