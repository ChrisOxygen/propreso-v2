export default function AccountLoading() {
  return (
    <div className="px-2 max-w-2xl">
      {/* Settings sections */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-xl p-5 mb-3 bg-card border border-border animate-pulse"
        >
          <div className="h-4 rounded w-28 mb-3 bg-border" />
          <div className="space-y-2">
            <div className="h-3 rounded w-full bg-accent" />
            <div className="h-3 rounded w-2/3 bg-accent" />
          </div>
        </div>
      ))}
    </div>
  );
}
