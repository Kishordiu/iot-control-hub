import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("glass-panel p-4 animate-pulse", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 w-16 bg-muted rounded" />
        <div className="h-4 w-4 bg-muted rounded" />
      </div>
      <div className="h-7 w-12 bg-muted rounded" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="glass-panel overflow-hidden animate-pulse">
      <div className="p-4 border-b border-border">
        <div className="h-5 w-32 bg-muted rounded" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-3 border-b border-border/50">
          <div className="h-4 w-4 bg-muted rounded-full" />
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="flex-1" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
