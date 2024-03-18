import { create } from 'zustand';
import { Message } from './Message.type';

export interface MessageState {
  visible: boolean;
  variant: Message;
  title: string;
  subtitle: string;
  show: (variant: Message, title?: string, subtitle?: string) => void;
  hide: () => void;
}

// Create your store with the initial state and actions.
export const useMessageStore = create<MessageState>((set) => ({
  // initial state
  visible: false,
  title: '',
  subtitle: '',
  variant: 'info', // Assuming 'info' is a valid value for Message type
  show: (variant, title = '', subtitle = '') =>
    set({
      visible: true,
      variant,
      title,
      subtitle,
    }),

  hide: () => set({ visible: false }),
}));

export const showMessage = (
  variant: Message,
  title?: string,
  subtitle?: string
) => {
  useMessageStore.getState().show(variant, title, subtitle);
};

export const hideMessage = () => {
  useMessageStore.getState().hide();
};
