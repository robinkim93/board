import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "sonner";

export const EmptyBoard = () => {
  const { organization } = useOrganization();
  const { mutation, isPending } = useApiMutation(api.board.create);

  const onClickCreateBoardButton = () => {
    if (!organization) return;

    mutation({
      title: "Untitled",
      orgId: organization.id,
    })
      .then((id) => {
        toast.success("create success");
        // Todo : board/{id}로 redirection
      })
      .catch((error) => {
        toast.error("Failed to create");
      });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src="./empty-search.svg"
        alt="empty-search"
        width={200}
        height={200}
      />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <Button
        disabled={isPending}
        size={"lg"}
        className="mt-6"
        onClick={onClickCreateBoardButton}
      >
        Create board
      </Button>
    </div>
  );
};
