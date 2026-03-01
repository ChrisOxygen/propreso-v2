export default function GenerateLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="mb-6">
        <div
          className="h-4 w-20 rounded mb-4 animate-pulse"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="h-7 w-40 rounded-lg mb-2 animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="h-4 w-72 rounded animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      </div>

      {/* Two-panel skeleton */}
      <div className="flex flex-col lg:grid lg:grid-cols-[420px_1fr] gap-6">
        {/* Left: form skeleton */}
        <div
          className="rounded-xl p-5 flex flex-col gap-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Profile row */}
          <div>
            <div className="h-3 w-14 rounded mb-2.5 animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="h-10 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* Job fields */}
          <div className="flex flex-col gap-4">
            <div className="h-3 w-20 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="h-9 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="h-9 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="h-40 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* Options skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-3 w-28 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="grid grid-cols-2 gap-1.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-9 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
              ))}
            </div>
            <div className="h-14 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* CTA */}
          <div className="h-11 rounded-xl animate-pulse" style={{ background: "rgba(200,73,26,0.15)" }} />
        </div>

        {/* Right: output skeleton */}
        <div
          className="rounded-xl animate-pulse"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px dashed rgba(255,255,255,0.08)",
            minHeight: "340px",
          }}
        />
      </div>
    </div>
  );
}
