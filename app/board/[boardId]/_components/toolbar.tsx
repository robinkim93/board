import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  Type,
  Undo2,
} from "lucide-react";

export const ToolBar = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col space-y-4">
      <div className="bg-white rounded-md p-1.5 shadow-md flex space-y-1 flex-col items-center">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Pencil"
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 shadow-md flex space-y-1 flex-col items-center">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={() => {}}
          isDisabled={true}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={() => {}}
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export const ToolBarSkeleton = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col space-y-4 bg-muted w-[52px] h-[360px] rounded-md p-1.5 shadow-md">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
