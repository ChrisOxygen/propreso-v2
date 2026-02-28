// Shown immediately when navigating to /dashboard while server data fetches
export default function DashboardLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div
            className="h-7 rounded-lg w-28 animate-pulse"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div
            className="h-3 rounded w-44 mt-2 animate-pulse"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>
        <div
          className="h-9 rounded-lg w-32 shrink-0 animate-pulse"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl p-4 animate-pulse"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="h-8 rounded w-14"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <div
              className="h-3 rounded w-20 mt-2"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
          </div>
        ))}
      </div>

      {/* Recent proposals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div
            className="h-3.5 rounded w-32 animate-pulse"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div
            className="h-3 rounded w-12 animate-pulse"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[1, 2, 3, 4, 5].map((i, idx, arr) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 animate-pulse"
              style={{
                borderBottom:
                  idx < arr.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <div>
                <div
                  className="h-3.5 rounded w-52"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                <div
                  className="h-3 rounded w-32 mt-1.5"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>
              <div
                className="h-5 rounded-full w-16 shrink-0"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
