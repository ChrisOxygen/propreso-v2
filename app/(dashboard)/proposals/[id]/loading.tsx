export default function ProposalDetailLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl">
      {/* Back link */}
      <div
        className="h-3 rounded w-28 mb-5 animate-pulse"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      {/* Title */}
      <div
        className="h-7 rounded w-3/4 animate-pulse"
        style={{ background: "rgba(255,255,255,0.07)" }}
      />
      <div
        className="h-7 rounded w-1/2 mt-2 animate-pulse"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      {/* Meta row */}
      <div className="flex items-center gap-2 mt-3 mb-5">
        <div
          className="h-3 rounded w-24 animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <div
          className="h-5 rounded w-12 animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <div
          className="h-5 rounded w-14 animate-pulse"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
        <div
          className="h-3 rounded w-20 animate-pulse"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </div>

      {/* Status bar */}
      <div
        className="flex gap-1.5 pt-3 mt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 h-7 rounded-md animate-pulse"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        ))}
      </div>

      {/* Content block */}
      <div
        className="rounded-xl p-5 sm:p-6 mt-5 animate-pulse"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="h-3 rounded w-28 mb-4"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div className="space-y-2.5">
          {[100, 92, 85, 100, 78, 95, 60].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded"
              style={{
                background: "rgba(255,255,255,0.05)",
                width: `${w}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
