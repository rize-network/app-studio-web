import { create } from 'zustand';

export interface MessageState {
  visible: boolean;
  variant?: string;
  message: string;
  show: (variant?: string, message?: string) => void;
  hide: () => void;
}

// Créez votre magasin avec l'état initial et les actions.
export const useMessageStore = create<MessageState>((set) => ({
  // état initial
  visible: false,
  message: '',
  // les actions peuvent simplement muter l'état en utilisant la fonction `set`
  show: (variant, message) =>
    set((state) => ({
      ...state,
      visible: true,
      variant: variant ?? state.variant, // Utiliser l'ancienne variante si aucune n'est fournie
      message: message ?? state.message, // Utiliser l'ancien message si aucun n'est fourni
    })),

  hide: () => set({ visible: false }),
}));

export const showMessage = (variant: string, message?: string) => {
  useMessageStore.getState().show(variant, message);
};

export const hideMessage = () => {
  useMessageStore.getState().hide();
};
