export default function AccountLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <div
          className="h-7 rounded-lg w-24 animate-pulse"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
        <div
          className="h-3 rounded w-48 mt-2 animate-pulse"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </div>

      {/* Settings sections */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-xl p-5 mb-3 animate-pulse"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="h-4 rounded w-28 mb-3"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div className="space-y-2">
            <div
              className="h-3 rounded w-full"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            <div
              className="h-3 rounded w-2/3"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
