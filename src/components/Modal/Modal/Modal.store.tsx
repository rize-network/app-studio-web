import { create } from 'zustand';
// Defines the structure for a single modal instance managed by the store.
export interface ModalItem {
  // A unique string identifier for the modal.
  name: string;
  // An object containing properties to be passed to the modal component, including its visibility state.
  props: any & { isVisible: boolean };
  // An object containing properties for the modal's overlay component.
  overlayProps: any;
}
// Defines the overall state shape and available actions for the modal store.
export interface ModalState {
  // An array holding all currently active modal items.
  modals: ModalItem[];
  // Function to add a new modal to the state, making it visible.
  show: (name: string, modalProps?: any, overlayProps?: any) => void;
  // Function to remove a modal from the state, making it hidden.
  hide: (name?: string) => void;
  // A callback function executed when a modal is shown, allowing custom side effects.
  onShow: (name: string, props?: any) => void;
  // A callback function executed when a modal is hidden, allowing custom side effects.
  onHide: (name?: string) => void;
  // Function to set or update the 'onShow' callback in the store.
  setOnShow: (onShow: (name: string, props?: any) => void) => void;
  // Function to set or update the 'onHide' callback in the store.
  setOnHide: (onHide: (name?: string) => void) => void;
}
// Initializes the Zustand store for managing modal states and actions.
export const useModalStore = create<ModalState>((set) => ({
  // The initial state property: an empty array of modals.
  modals: [],
  // Default implementation for the 'onHide' callback.
  onHide: (name?: string) => name,
  // Default implementation for the 'onShow' callback.
  onShow: (name: string, props?: any) => ({ name, props }),
  // Action to add a new modal to the 'modals' array, setting its 'isVisible' prop to true.
  show: (name, modalProps = {}, overlayProps = {}) => {
    set((state: ModalState) => ({
      ...state,
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
  // Action to remove a modal from the 'modals' array based on its name, or clear all modals if no name is provided.
  hide: (name) => {
    set((state: ModalState) => {
      if (!name) {
        return { modals: [] };
      }
      return {
        ...state,
        modals: state.modals.filter((modal) => modal.name !== name),
      };
    });
  },
  // Action to update the 'onHide' callback function within the store.
  setOnHide: (onHide: (name?: string) => void) => {
    set((state: ModalState) => ({ ...state, onHide }));
  },
  // Action to update the 'onShow' callback function within the store.
  setOnShow: (onShow: (name: string, props?: any) => void) => {
    set((state: ModalState) => ({ ...state, onShow }));
  },
}));
// A convenience function to programmatically display a modal and trigger its 'onShow' callback.
export const showModal = (
  name: string,
  modalProps: any = {},
  overlayProps: any = {}
) => {
  // Calls the 'show' action from the modal store to add the modal to the state.
  useModalStore.getState().show(name, modalProps, overlayProps);
  // Triggers the registered 'onShow' callback for the newly shown modal, allowing external effects.
  useModalStore.getState().onShow(name, modalProps);
};
// A convenience function to programmatically hide a modal and trigger its 'onHide' callback.
export const hideModal = (name?: string) => {
  console.log('hideModal', name);
  // Triggers the registered 'onHide' callback for the hidden modal, allowing external effects.
  useModalStore.getState().onHide(name);
  // Calls the 'hide' action from the modal store to remove the modal from the state.
  useModalStore.getState().hide(typeof name === 'string' ? name : undefined);
};
