import { create } from 'zustand';

export interface ModalItem {
  name: string;
  props: any & { isVisible: boolean };
  overlayProps: any;
}

export interface ModalState {
  modals: ModalItem[];
  show: (name: string, modalProps?: any, overlayProps?: any) => void;
  hide: (name?: string) => void;
  onShow: (name: string, props?: any) => void;
  onHide: (name?: string) => void;
  setOnShow: (onShow: (name: string, props?: any) => void) => void;
  setOnHide: (onHide: (name?: string) => void) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  onHide: (name?: string) => {},
  onShow: (name: string, props?: any) => {},
  show: (name, modalProps = {}, overlayProps = {}) => {
    set((state: ModalState) => ({
      modals: [
        ...state.modals,
        {
          name,
          props: { ...modalProps, isVisible: true },
          overlayProps,
        },
      ],
    }));
  },
  hide: (name) => {
    set((state: ModalState) => {
      if (!name) {
        // Hide all modals
        return { modals: [] };
      }
      // Hide specific modal by name
      return {
        modals: state.modals.filter((modal) => modal.name !== name),
      };
    });
  },
  setOnHide: (onHide: (name?: string) => void) => {
    set((state: ModalState) => ({ onHide }));
  },
  setOnShow: (onShow: (name: string, props?: any) => void) => {
    set((state: ModalState) => ({ onShow }));
  },
}));

export const showModal = (
  name: string,
  modalProps: any = {},
  overlayProps: any = {}
) => {
  useModalStore.getState().show(name, modalProps, overlayProps);
  useModalStore.getState().onShow(name, modalProps);
};

export const hideModal = (name?: string) => {
  console.log('hideModal', name);
  useModalStore.getState().onHide(name);

  useModalStore.getState().hide(typeof name === 'string' ? name : undefined);
};
