import { CSSProperties } from 'react';
import { Elevation } from 'src/utils/elevation';
import { Shadow } from 'app-studio';

import {
  Message,
  MessageViewStyles,
  Position,
  Shape,
  ThemesType,
} from './Message.type';

export interface MessageLayoutProps {
  icons?: { [x: string]: string };
  container?: any;
  theme?: ThemesType;
  position?: Position;
}

export interface MessageProps {
  subtitle?: string;
  variant: Message;
  show?: boolean;
  hide: Function;
  timeout?: number;
  title: string;
  theme?: ThemesType;
  isClosable?: boolean;
  shadow?: Shadow | Elevation | CSSProperties;
  shape?: Shape;
  styles?: MessageViewStyles;
  action?: Function;
  actionText?: string;
  showIcon?: boolean;
}
