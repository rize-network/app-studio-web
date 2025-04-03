import { create } from 'zustand';
import { MessageState } from './Message.props';
import { MessageType, ShowMessageType } from './Message.type';

// Create your store with the initial state and actions.
export const useMessageStore = create<MessageState>((set) => ({
  // initial state
  visible: false,
  title: '',
  subtitle: '',
  variant: 'info',
  isClosable: false,
  views: {},
  action: () => {},
  actionText: '',
  showIcon: false,
  timeout: 3000,
  show: (
    variant,
    title = '',
    subtitle = '',
    isClosable,
    views,
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
      views,
      action,
      actionText,
      showIcon,
      timeout,
    }),

  hide: () => set({ visible: false }),
}));

export const showMessage = (
  variant: MessageType,
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
      props?.views,
      props?.action,
      props?.actionText,
      props?.showIcon,
      props?.timeout
    );
};

export const hideMessage = () => {
  useMessageStore.getState().hide();
};
