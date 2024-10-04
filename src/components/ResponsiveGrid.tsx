import { useRef } from "react";

export default function ResponsiveGrid({
  children,
  childWidth,
}: {
  children: React.ReactNode;
  childWidth: number;
}) {
  const gridStyle = {
    gridTemplateColumns: `repeat(auto-fit, ${childWidth}px)`,
  };

  return (
    <div className="grid gap-4 w-full justify-center" style={gridStyle}>
      {children}
    </div>
  );
}
