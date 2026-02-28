export default function ProfilesLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div
            className="h-7 rounded-lg w-24 animate-pulse"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div
            className="h-3 rounded w-48 mt-2 animate-pulse"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>
        <div
          className="h-9 rounded-lg w-32 shrink-0 animate-pulse"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Profile cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl p-5 animate-pulse"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div
                className="h-5 rounded w-32"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
              <div
                className="h-5 rounded-full w-16"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            </div>
            <div className="space-y-2">
              <div
                className="h-3 rounded w-full"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
              <div
                className="h-3 rounded w-3/4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>
            <div className="flex gap-1.5 mt-4">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="h-5 rounded w-12"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
