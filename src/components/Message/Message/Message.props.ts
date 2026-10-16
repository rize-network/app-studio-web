import {
  MessageType,
  MessageViewStyles,
  Position,
  ThemesType,
} from './Message.type';

export interface MessageLayoutProps {
  container?: any;
  theme?: ThemesType;
  position?: Position;
}
export interface ShowMessageProps {
  isClosable?: boolean;
  views?: MessageViewStyles;
  // Invoked when the action button is pressed.
  action?: () => void;
  actionText?: string;
  showIcon?: boolean;
  timeout?: number;
}
export interface MessageProps extends ShowMessageProps {
  subtitle?: string;
  variant: MessageType;
  show?: boolean;
  hide: () => void;
  title: string;
  theme?: ThemesType;
}

export interface MessageState {
  visible: boolean;
  variant: MessageType;
  title: string;
  subtitle: string;
  isClosable?: boolean;
  views?: MessageViewStyles;
  action?: () => void;
  actionText?: string;
  showIcon?: boolean;
  timeout?: number;
  show: (
    variant: MessageType,
    title?: string,
    subtitle?: string,
    isClosable?: boolean,
    views?: MessageViewStyles,
    action?: () => void,
    actionText?: string,
    showIcon?: boolean,
    timeout?: number
  ) => void;
  hide: () => void;
}
