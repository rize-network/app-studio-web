import type { CSSProperties } from 'react';
import type { Variant, Size } from './ChatWidget.type';
// Defines a map of CSS properties for various standard sizes (small, medium, large) used across the chat widget components.
export const Sizes: Record<Size, CSSProperties> = {
  sm: {
    fontSize: '12px',
    padding: '8px',
  },
  md: {
    fontSize: '14px',
    padding: '10px',
  },
  lg: {
    fontSize: '14px',
    padding: '12px',
  },
};
// Defines a map of CSS properties for different visual variants of the chat widget, such as default, glassy, and minimal designs.
export const Variants: Record<Variant, CSSProperties> = {
  default: {
    backgroundColor: 'color-white',
    border: '1px solid color-gray-200',
    borderRadius: '12px',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
  },
  glassy: {
    backgroundColor: 'color-white-900',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(226, 232, 240, 0.9)',
    borderRadius: '12px',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
  },
  minimal: {
    backgroundColor: 'color-white',
    border: '1px solid color-gray-200',
    borderRadius: '12px',
  },
};
// Specifies a collection of CSS properties tailored for different sizes of chat message bubbles.
export const BubbleSizes: Record<Size, CSSProperties> = {
  sm: {
    fontSize: '12px',
    padding: '8px 10px',
    borderRadius: '12px',
  },
  md: {
    fontSize: '14px',
    padding: '10px 12px',
    borderRadius: '12px',
  },
  lg: {
    fontSize: '14px',
    padding: '12px 14px',
    borderRadius: '14px',
  },
};
// Defines the default CSS properties for chat bubbles sent by the user, including background, text color, and alignment.
export const UserBubbleStyles: CSSProperties = {
  backgroundColor: 'theme-primary',
  color: 'color-white',
  alignSelf: 'flex-end',
  borderBottomRightRadius: '4px',
};
// Defines the default CSS properties for chat bubbles sent by the assistant, including background, text color, alignment, and border.
export const AssistantBubbleStyles: CSSProperties = {
  backgroundColor: 'color-white',
  color: 'color-gray-900',
  alignSelf: 'flex-start',
  borderBottomLeftRadius: '4px',
  border: '1px solid color-gray-200',
};
// Defines the CSS properties for the container that holds the chat input field and related controls.
export const InputContainerStyles: CSSProperties = {
  position: 'relative',
  backgroundColor: 'color-white',
  borderTop: '1px solid color-gray-200',
  padding: '12px',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
};
// An comprehensive object containing the default CSS properties for various sub-components of the ChatWidget, including the main container, message area, input, bubbles, timestamps, and buttons.
export const DefaultChatWidgetStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    padding: '16px',
    backgroundColor: 'color-gray-50',
  },
  inputContainer: InputContainerStyles,
  bubble: {
    maxWidth: '80%',
    position: 'relative' as const,
    wordWrap: 'break-word' as const,
    animation: 'chatBubbleAppear 0.25s ease-out',
  },
  timestamp: {
    position: 'absolute' as const,
    top: '-24px',
    fontSize: '12px',
    color: 'color-gray-500',
    backgroundColor: 'color-white-900',
    padding: '2px 8px',
    borderRadius: '9999px',
    opacity: 0,
    transition: 'opacity 0.15s ease-out',
    border: '1px solid color-gray-200',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    resize: 'none' as const,
    fontFamily: 'inherit',
    fontSize: '14px',
    minHeight: '24px',
    maxHeight: '120px',
  },
  sendButton: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease, opacity 0.2s ease',
    flexShrink: 0,
  },
  attachmentButton: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s ease',
    flexShrink: 0,
  },
};
