import React from 'react';
import { View, Text, useTheme, Horizontal, Vertical } from 'app-studio';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Markdown } from "./markdown"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export interface MessageProps {
  children: React.ReactNode;
  className?: string; // Ignored/Mapped
}

export const Message = ({ children, ...props }: MessageProps) => {
  return (
    <Horizontal gap={12} alignItems="flex-start" width="100%" {...props}>
      {children}
    </Horizontal>
  );
}

export interface MessageAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export const MessageAvatar = ({ src, alt, fallback }: MessageAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
}

export interface MessageContentProps {
  children: React.ReactNode;
  markdown?: boolean;
  className?: string; // We'll try to extract styles if possible or provide defaults
}

export const MessageContent = ({ children, markdown, className, ...props }: MessageContentProps) => {
  // Styles based on original "bg-secondary prose..."
  // Since we don't have 'prose' class from Tailwind typography, we rely on Markdown component or basic text.

  // We need to determine if it's user or assistant to style properly?
  // The original component relied on parent or variant classes passed in `className`.
  // In `full-chat-app.tsx`:
  // Assistant: `text-foreground prose flex-1 rounded-lg bg-transparent p-0`
  // User: `bg-muted text-primary max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]`

  // We can't easily parse `className` to get these intentions.
  // Ideally, `MessageContent` should accept props like `variant="user" | "assistant"`.
  // But to support existing usage, we might check `className` string for keywords?
  // That's brittle.
  // However, I can just provide a generic View and let the parent pass styles via app-studio props if I update the parent.
  // But here `className` is passed.

  // Let's make MessageContent a styled View.
  // If markdown is true, use Markdown component.

  const isUser = className?.includes('bg-muted');

  const containerProps = {
    padding: isUser ? '10px 20px' : '0px',
    borderRadius: isUser ? '24px' : '8px',
    backgroundColor: isUser ? 'color.gray.100' : 'transparent',
    maxWidth: isUser ? '85%' : '100%',
    ...props
  };

  if (markdown) {
    return (
      <View {...containerProps}>
        <Markdown>{children as string}</Markdown>
      </View>
    );
  }

  return (
    <View {...containerProps}>
       {typeof children === 'string' ? <Text>{children}</Text> : children}
    </View>
  );
}

export const MessageActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <Horizontal gap={8} alignItems="center">
      {children}
    </Horizontal>
  );
}

export const MessageAction = ({ children, tooltip }: { children: React.ReactNode, tooltip: React.ReactNode }) => {
    // Tooltip behavior is simplified (no-op or title)
    return (
        <View title={typeof tooltip === 'string' ? tooltip : undefined}>
            {children}
        </View>
    )
}
