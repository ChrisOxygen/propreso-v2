interface SpinnerProps {
  size?: number;
  color?: string;
  trackColor?: string;
}

export function Spinner({
  size = 16,
  color = "#E85A2C",
  trackColor = "rgba(0,0,0,0.08)",
}: SpinnerProps) {
  return (
    <div
      className="animate-spin"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${trackColor}`,
        borderTopColor: color,
        flexShrink: 0,
      }}
    />
  );
}
