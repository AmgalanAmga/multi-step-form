import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const RegisterSkeleton = () => (
  <Card className="gap-0 py-0 min-h-0 max-h-full overflow-y-auto overscroll-contain bg-white/90 shadow-xl shadow-emerald-950/10 backdrop-blur-xl">
    <CardContent className="space-y-7 p-4 sm:p-6">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-3/4 h-10" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-11" />
    </CardContent>
  </Card>
);
