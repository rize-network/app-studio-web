import {
  Message,
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
  styles?: MessageViewStyles;
  action?: Function;
  actionText?: string;
  showIcon?: boolean;
  timeout?: number;
}
export interface MessageProps extends ShowMessageProps {
  subtitle?: string;
  variant: Message;
  show?: boolean;
  hide: Function;
  title: string;
  theme?: ThemesType;
}

export interface MessageState {
  visible: boolean;
  variant: Message;
  title: string;
  subtitle: string;
  isClosable?: boolean;
  styles?: MessageViewStyles;
  action?: Function;
  actionText?: string;
  showIcon?: boolean;
  timeout?: number;
  show: (
    variant: Message,
    title?: string,
    subtitle?: string,
    isClosable?: boolean,
    styles?: MessageViewStyles,
    action?: Function,
    actionText?: string,
    showIcon?: boolean,
    timeout?: number
  ) => void;
  hide: () => void;
}
