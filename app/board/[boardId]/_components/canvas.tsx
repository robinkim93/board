"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <div className="w-full h-full relative bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar />
    </div>
  );
};
