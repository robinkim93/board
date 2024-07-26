import { Loader } from "lucide-react";
import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";

export const Loading = () => {
  return (
    <div className="h-full w-full relative bg-neutral-100 flex justify-center items-center">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <ToolBar.Skeleton />
    </div>
  );
};
