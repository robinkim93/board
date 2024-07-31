"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const boardData = useQuery(api.board.getBoard, {
    id: boardId as Id<"boards">,
  });

  if (!boardData) return <InfoSkeleton />;

  const onClickTitleButton = () => {
    onOpen(boardData._id, boardData.title);
  };

  return (
    <div className="absolute top-2 left-2 bg-white p-1.5 rounded-md shadow-md flex items-center h-12">
      <Hint label="Go to board" side="bottom" sideOffset={10}>
        <Button asChild variant="ghost" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="board logo" height={40} width={40} />
            <span
              className={cn(
                "ml-2 font-semibold text-xl text-black",
                font.className
              )}
            >
              Boardy
            </span>
          </Link>
        </Button>
      </Hint>
      <div className="text-neutral-300 px-1.5">|</div>
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant={"ghost"}
          className="text-base font-normal px-2"
          onClick={onClickTitleButton}
        >
          {boardData.title}
        </Button>
      </Hint>
      <div className="text-neutral-300 px-1.5">|</div>
      <Actions
        id={boardData._id}
        title={boardData.title}
        side="bottom"
        sideOffset={10}
      >
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </Actions>
    </div>
  );
};

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-muted p-1.5 rounded-md shadow-md flex items-center h-12 w-[300px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
