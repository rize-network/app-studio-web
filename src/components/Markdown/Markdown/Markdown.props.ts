import { ViewProps } from 'app-studio';
import type { ReactNode } from 'react';

export interface MarkdownTypingOptions {
  typing?: boolean | { charsPerTick?: number; intervalMs?: number };
  /** Keep the cursor active while waiting for more content; completion waits for false. */
  isStreaming?: boolean;
  onTypingComplete?: () => void;
}

export interface MarkdownProps
  extends Omit<ViewProps, 'value' | 'children'>,
    MarkdownTypingOptions {
  value: string;
  label?: string;
  /** Override link navigation, for example to use the application's native router. */
  onLinkPress?: (url: string) => void;
  /** Return undefined to keep the safe default, or replace a link with application content. */
  renderLink?: (url: string, children: ReactNode) => ReactNode | undefined;
  /** Disable external image loading while retaining readable alternative text. */
  allowImages?: boolean;
  /** Disable video loading and navigation while retaining its caption. */
  allowVideos?: boolean;
  /** Optional application player, especially on native. Called only for safe, allowed URLs. */
  renderVideo?: (url: string, caption: string) => ReactNode | undefined;
  labels?: { sourceFallback?: string };
  views?: {
    container?: ViewProps;
    block?: ViewProps;
    source?: ViewProps;
    notice?: ViewProps;
  };
}
