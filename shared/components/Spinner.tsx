interface SpinnerProps {
  size?: number;
  color?: string;
  trackColor?: string;
}

export function Spinner({
  size = 16,
  color = "#E85A2C",
  trackColor = "rgba(255,255,255,0.1)",
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
