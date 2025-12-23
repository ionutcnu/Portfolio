import { BentoBox } from "./BentoGrid";

interface WidgetSkeletonProps {
  span?: 1 | 2 | 3 | 4;
  height?: "short" | "medium" | "tall";
}

export default function WidgetSkeleton({ span = 1, height = "medium" }: WidgetSkeletonProps) {
  const heights = {
    short: "h-32",
    medium: "h-48",
    tall: "h-64",
  };

  return (
    <BentoBox span={span}>
      <div className="animate-pulse space-y-3">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-3 w-8 bg-muted rounded" />
        </div>

        {/* Content skeleton */}
        <div className={`${heights[height]} w-full bg-muted/50 rounded-lg`} />

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="h-2 w-20 bg-muted rounded" />
          <div className="h-2 w-16 bg-muted rounded" />
        </div>
      </div>
    </BentoBox>
  );
}
