import { Skeleton } from "@/components/ui/skeleton";

export const RegisterSkeleton = () => (
  <div role="status" className="space-y-5 rounded-[20px] border border-[#ddc2ff5c] p-4 sm:p-6">
    <span className="sr-only">Loading registration form…</span>
    <div aria-hidden="true" className="flex justify-around">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="size-8 rounded-full" />
    </div>
    <Skeleton className="h-8 w-2/3" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-11 w-full" />
    <Skeleton className="h-11 w-full" />
    <Skeleton className="h-11 w-full" />
    <Skeleton className="h-11 w-full" />
  </div>
);
