import { Card } from "@/components/ui/card";

export const ContentSkeleton = () => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-lg bg-secondary animate-pulse" />
        <div className="space-y-2">
          <div className="h-5 w-24 bg-secondary rounded animate-pulse" />
          <div className="h-4 w-32 bg-secondary rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-secondary rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-secondary rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-secondary rounded animate-pulse" />
        <div className="h-4 w-full bg-secondary rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-secondary rounded animate-pulse" />
      </div>
    </Card>
  );
};
