import React from 'react';
import { View, Text, useTheme, Horizontal, Vertical } from 'app-studio';
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Markdown } from "./markdown"
import { Tooltip, TooltipTrigger, TooltipContent } from "../../ui/tooltip"

export interface MessageProps {
  children: React.ReactNode;
  className?: string; // Ignored/Mapped
  style?: React.CSSProperties; // Add style support
}

export const Message = ({ children, style, ...props }: MessageProps) => {
  return (
    <Horizontal gap={12} alignItems="flex-start" width="100%" style={style} {...props}>
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
  style?: React.CSSProperties;
}

export const MessageContent = ({ children, markdown, className, style, ...props }: MessageContentProps) => {
  const isUser = className?.includes('bg-muted');

  const containerProps = {
    padding: isUser ? '10px 20px' : '0px',
    borderRadius: isUser ? '24px' : '8px',
    backgroundColor: isUser ? 'color.gray.100' : 'transparent',
    maxWidth: isUser ? '85%' : '100%',
    style: style, // Pass style down
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

export const MessageActions = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <Horizontal gap={8} alignItems="center">
      {children}
    </Horizontal>
  );
}

export const MessageAction = ({ children, tooltip }: { children: React.ReactNode, tooltip: React.ReactNode }) => {
    return (
        <View title={typeof tooltip === 'string' ? tooltip : undefined}>
            {children}
        </View>
    )
}
