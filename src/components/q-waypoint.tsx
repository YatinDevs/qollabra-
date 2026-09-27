/**
 * An invisible stop for the travelling balloon-Q (see ScrollQ). Place inside a `relative` element;
 * the Q glides to this box when the box reaches the middle of the viewport.
 * Its height sets the Q's size there; `rotate` tilts it.
 */
export function QWaypoint({
  side,
  size = "md",
  rotate = 0,
  className = "top-0",
}: {
  side: "left" | "right";
  size?: "sm" | "md" | "lg";
  rotate?: number;
  className?: string;
}) {
  const h = { sm: "h-12", md: "h-16", lg: "h-24" }[size];
  return (
    <span
      aria-hidden
      data-q-anchor=""
      data-q-rotate={rotate}
      className={`pointer-events-none absolute hidden aspect-[107/152] xl:block ${h} ${
        side === "left" ? "-left-16" : "-right-16"
      } ${className}`}
    />
  );
}
