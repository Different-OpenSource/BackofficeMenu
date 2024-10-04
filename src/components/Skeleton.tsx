import { Fragment } from "react";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className="animate-pulse ">
      <div className={`bg-gray-500 ${className}`}></div>
    </div>
  );
}

export function Skeletons({
  className,
  amount,
}: {
  className?: string;
  amount?: number;
}) {
  const quantity = amount ?? Math.floor(Math.random() * 10) + 3;
  return (
    <Fragment>
      {Array(quantity)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className={className} />
        ))}
    </Fragment>
  );
}
