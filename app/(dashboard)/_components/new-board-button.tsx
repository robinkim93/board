import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutation, isPending } = useApiMutation(api.board.create);
  const router = useRouter();
  const onClickNewBoardButton = () => {
    mutation({ orgId, title: "Untitled" })
      .then((id) => {
        toast.success("create success");
        router.push(`/board/${id}`);
      })
      .catch((error) => {
        toast.error("Failed to create");
      });
  };

  return (
    <button
      disabled={isPending || disabled}
      className={cn(
        "col-span-1 hover:bg-blue-800 aspect-[100/127] bg-blue-600 flex flex-col justify-center items-center py-6 rounded-lg",
        (isPending || disabled) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
      onClick={onClickNewBoardButton}
    >
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};
