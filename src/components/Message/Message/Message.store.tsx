import { create } from 'zustand';
import { MessageState } from './Message.props';
import { Message, ShowMessageType } from './Message.type';

// Create your store with the initial state and actions.
export const useMessageStore = create<MessageState>((set) => ({
  // initial state
  visible: false,
  title: '',
  subtitle: '',
  variant: 'info',
  isClosable: false,
  styles: {},
  action: () => {},
  actionText: '',
  showIcon: false,
  timeout: 3000,
  show: (
    variant,
    title = '',
    subtitle = '',
    isClosable,
    styles,
    action,
    actionText,
    showIcon,
    timeout
  ) =>
    set({
      visible: true,
      variant,
      title,
      subtitle,
      isClosable,
      styles,
      action,
      actionText,
      showIcon,
      timeout,
    }),

  hide: () => set({ visible: false }),
}));

export const showMessage = (
  variant: Message,
  title?: string,
  subtitle?: string,
  props?: ShowMessageType
) => {
  useMessageStore
    .getState()
    .show(
      variant,
      title,
      subtitle,
      props?.isClosable,
      props?.styles,
      props?.action,
      props?.actionText,
      props?.showIcon,
      props?.timeout
    );
};

export const hideMessage = () => {
  useMessageStore.getState().hide();
};
