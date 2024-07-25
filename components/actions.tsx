import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const { mutation, isPending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const onClickRemoveBoard = () => {
    mutation({ id })
      .then(() => {
        toast.success(`delete success to ${title}`);
      })
      .catch(() => toast.error("delete failed"));
  };

  const onClickCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Copy success"))
      .catch(() => toast.error("copy failed"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={onClickCopyLink}
        >
          <Link2 className="w-4 h-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Rename board
        </DropdownMenuItem>
        <ConfirmModal
          title="Delete this board?"
          description="This will delete the board and all of its contents"
          onConfirm={onClickRemoveBoard}
          disabled={isPending}
        >
          <Button
            variant={"ghost"}
            className="p-3 cursor-pointer w-[231px] rounded-sm justify-start font-normal"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
