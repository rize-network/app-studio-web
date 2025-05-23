import {
  MessageType,
  MessageViewStyles,
  Position,
  ThemesType,
} from './Message.type';

export interface MessageLayoutProps {
  icons?: { [x: string]: string };
  container?: any;
  theme?: ThemesType;
  position?: Position;
}
export interface ShowMessageProps {
  isClosable?: boolean;
  views?: MessageViewStyles;
  action?: Function;
  actionText?: string;
  showIcon?: boolean;
  timeout?: number;
}
export interface MessageProps extends ShowMessageProps {
  subtitle?: string;
  variant: MessageType;
  show?: boolean;
  hide: Function;
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
  action?: Function;
  actionText?: string;
  showIcon?: boolean;
  timeout?: number;
  show: (
    variant: MessageType,
    title?: string,
    subtitle?: string,
    isClosable?: boolean,
    views?: MessageViewStyles,
    action?: Function,
    actionText?: string,
    showIcon?: boolean,
    timeout?: number
  ) => void;
  hide: () => void;
}
