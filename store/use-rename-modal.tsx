import { create } from "zustand";

const defaultValue = {
  id: "",
  title: "",
};

interface IRenameModal {
  isOpen: boolean;
  value: typeof defaultValue;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  value: defaultValue,
  onOpen: (id, title) => {
    set({ isOpen: true, value: { id, title } });
  },
  onClose: () => {
    set({ isOpen: false, value: defaultValue });
  },
}));
