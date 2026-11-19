import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Skeleton } from "@/components/ui/Skeleton";

export const RegisterSkeleton = () => (
  <Card className="min-h-0 max-h-full overflow-y-auto overscroll-contain bg-card/90 shadow-[0_20px_80px_-35px_#193e2b33,0_3px_10px_#193e2b05] backdrop-blur-xl">
    <CardContent className="space-y-7 p-4 sm:p-6 [@media(min-height:850px)]:sm:p-9">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-3/4 h-10" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-11" />
    </CardContent>
  </Card>
);
