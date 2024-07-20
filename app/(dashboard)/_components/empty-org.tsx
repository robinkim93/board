import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image src="./elements.svg" alt="elements" width={200} height={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Boardy</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"}>Create organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 border-none max-w-[480px] rounded-md">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
