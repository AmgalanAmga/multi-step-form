import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Skeleton } from "@/components/ui/Skeleton";

export const RegisterSkeleton = () => (
  <Card className="bg-card/90 shadow-[0_20px_80px_-35px_#233c2933,0_3px_10px_#233c2905] backdrop-blur-xl">
    <CardContent className="space-y-7 p-7 sm:p-10">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-3/4 h-10" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-11" />
    </CardContent>
  </Card>
);
