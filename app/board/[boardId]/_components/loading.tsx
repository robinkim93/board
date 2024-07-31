import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolBarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <div className="h-full w-full relative bg-neutral-100 flex justify-center items-center">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolBarSkeleton />
    </div>
  );
};
