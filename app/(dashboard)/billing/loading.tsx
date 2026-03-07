export default function BillingLoading() {
  return (
    <div className="px-2 max-w-2xl">
      {/* Sections */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl p-5 mb-4 animate-pulse bg-card border border-border"
        >
          <div className="h-4 rounded w-32 mb-4 bg-muted" />
          <div className="space-y-3">
            <div className="h-3 rounded w-full bg-muted" />
            <div className="h-3 rounded w-3/4 bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
