export type Position = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type Shape = 'sharp' | 'rounded';

export type CloseButtonPosition = 'left' | 'right' | 'none';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type MessageType = 'info' | 'warning' | 'error' | 'success';

export type MessageViewStyles = {
  container?: any;
  title?: any;
  subtitle?: any;
  icon?: any;
  actionText?: any;
  closingIcon?: {
    container?: any;
    icon?: any;
  };
};

export type Theme = {
  container: {
    backgroundColor?: string;
    border?: string;
  };
  icon: {
    color?: string;
    name?: string;
  };
  content: {
    color?: string;
  };
  close: {
    color?: string;
    name?: string;
  };
};
export type ThemesType = {
  info: Theme;
  success: Theme;
  error: Theme;
  warning: Theme;
};

export type ShowMessageType = {
  isClosable?: boolean;
  views?: MessageViewStyles;
  action?: Function;
  actionText?: string;
  showIcon?: boolean;
  timeout?: number;
};
