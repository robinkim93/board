"use client";

import { useSelf } from "@liveblocks/react/suspense";
import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";

export const Canvas = () => {
  const info = useSelf((me) => me.info);

  console.log(info);

  return (
    <div className="w-full h-full relative bg-neutral-100">
      <Info />
      <Participants />
      <ToolBar />
    </div>
  );
};
