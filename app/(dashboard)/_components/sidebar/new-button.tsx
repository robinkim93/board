import { Plus } from "lucide-react";
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Hint } from "@/components/hint";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="create organization"
            side="right"
            align="start"
            sideOffset={8}
          >
            <button className="bg-white/25 h-full w-full flex justify-center items-center rounded-md opacity-60 hover:opacity-100 transition">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 border-none max-w-[480px] rounded-md">
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
