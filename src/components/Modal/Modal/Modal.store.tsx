import { create } from 'zustand';

export interface ModalState {
  modal: string | boolean;
  modalProps: any & { isVisible: boolean };
  overlayProps: any;
  show: (modal: string, modalProps?: any, overlayProps?: any) => void;
  hide: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modal: false,
  modalProps: { isVisible: false },
  overlayProps: {},
  show: (modal, modalProps = {}, overlayProps = {}) => {
    if (modal) {
      modalProps.isVisible = true;
    }
    set((state: ModalState) => ({
      ...state,
      modal,
      modalProps,
      overlayProps,
    }));
  },
  hide: () => {
    set((state: ModalState) => ({
      ...state,
      modalProps: {
        isVisible: false,
      },
    }));
  },
}));

export const showModal = (
  modal: string,
  modalProps: any = {},
  overlayProps: any = {}
) => {
  useModalStore.getState().show(modal, modalProps, overlayProps);
};

export const hideModal = () => {
  useModalStore.getState().hide();
};
