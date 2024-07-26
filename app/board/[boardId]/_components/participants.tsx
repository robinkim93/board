import { Skeleton } from "@/components/ui/skeleton";

export const Participants = () => {
  return (
    <div className="absolute top-2 right-2 bg-white p-1.5 rounded-md shadow-md flex items-center h-12">
      user list
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 right-2 bg-muted p-1.5 rounded-md shadow-md flex items-center h-12 w-[120px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
