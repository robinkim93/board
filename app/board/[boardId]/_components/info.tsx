import { Skeleton } from "@/components/ui/skeleton";

export const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-white p-1.5 rounded-md shadow-md flex items-center h-12">
      info
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-muted p-1.5 rounded-md shadow-md flex items-center h-12 w-[300px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
