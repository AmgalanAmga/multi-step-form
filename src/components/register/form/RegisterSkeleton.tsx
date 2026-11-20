import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const RegisterSkeleton = () => (
  <Card className="relative min-h-0 gap-0 overflow-visible rounded-[20px] border-[#ddc2ff5c] bg-transparent bg-[linear-gradient(135deg,#5c41785c,#181125b8_58%,#3e275a75)] shadow-[inset_0_1px_0_#f7e4ff33] overscroll-contain py-0">
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
