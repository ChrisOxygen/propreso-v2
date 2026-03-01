export default function BillingLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <div
          className="h-7 rounded-lg w-20 animate-pulse"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
        <div
          className="h-3 rounded w-56 mt-2 animate-pulse"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </div>

      {/* Sections */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl p-5 mb-4 animate-pulse"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="h-4 rounded w-32 mb-4"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div className="space-y-3">
            <div
              className="h-3 rounded w-full"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            <div
              className="h-3 rounded w-3/4"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
