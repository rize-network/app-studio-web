import { ViewProps } from 'app-studio';

export interface MarkdownProps extends Omit<ViewProps, 'value' | 'children'> {
  value: string;
  label?: string;
  /** Override link navigation, for example to use the application's native router. */
  onLinkPress?: (url: string) => void;
  labels?: { sourceFallback?: string };
  views?: {
    container?: ViewProps;
    block?: ViewProps;
    source?: ViewProps;
    notice?: ViewProps;
  };
}
