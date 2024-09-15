import { useRef } from "react";

export default function ResponsiveGrid({
  children,
  childWidth,
}: {
  children: React.ReactNode;
  childWidth: number;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  const gridStyle = {
    gridTemplateColumns: `repeat(auto-fit, ${childWidth}px)`,
  };

  return (
    <div
      ref={gridRef}
      className="grid gap-4 w-full justify-center"
      style={gridStyle}
    >
      {children}
    </div>
  );
}
