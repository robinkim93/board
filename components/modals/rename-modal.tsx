"use client";

import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
  const { isOpen, onClose, value } = useRenameModal();
  const { mutation, isPending } = useApiMutation(api.board.update);

  const [title, setTitle] = useState<string>(value.title);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutation({
      id: value.id,
      title,
    })
      .then(() => {
        toast.success("Edit success");
        onClose();
      })
      .catch(() => toast.error("Edit failed"));
  };

  /**
   * 실시간으로 변경된 제목과 모달 내부의 title state를 동기화 하기 위한 useEffect
   * title flow는 BoardList에서 데이터 query -> BoardCard로 전달 -> Actions로 전달 -> RenameModal로 전달
   */
  useEffect(() => {
    setTitle(value.title);
  }, [value.title]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            disabled={isPending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board Title"
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
