import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  onClose: () => {},
  toggleModal: () => set((state: any) => ({ isOpen: !state.isOpen })),
  setOpen: (isOpen: boolean) => set(() => ({ isOpen })),
  setOnClose: (onClose: Function) => set(() => ({ onClose })),
}));
