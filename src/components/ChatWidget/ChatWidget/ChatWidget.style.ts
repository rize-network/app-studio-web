import type { CSSProperties } from 'react';
import type { Variant, Size } from './ChatWidget.type';

/** Size mappings for the ChatWidget component */
export const Sizes: Record<Size, CSSProperties> = {
  sm: {
    fontSize: '13px',
    padding: '8px',
  },
  md: {
    fontSize: '14px',
    padding: '12px',
  },
  lg: {
    fontSize: '16px',
    padding: '16px',
  },
};

/** Variant mappings for the ChatWidget component */
export const Variants: Record<Variant, CSSProperties> = {
  default: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
  },
  glassy: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  minimal: {
    backgroundColor: 'transparent',
    border: 'none',
  },
};

/** Bubble size mappings */
export const BubbleSizes: Record<Size, CSSProperties> = {
  sm: {
    fontSize: '13px',
    padding: '6px 10px',
    borderRadius: '14px',
  },
  md: {
    fontSize: '14px',
    padding: '8px 12px',
    borderRadius: '16px',
  },
  lg: {
    fontSize: '16px',
    padding: '10px 16px',
    borderRadius: '18px',
  },
};

/** User bubble styles (blue, aligned right) */
export const UserBubbleStyles: CSSProperties = {
  backgroundColor: 'rgba(37, 99, 235, 0.9)', // blue-600/90
  color: '#ffffff',
  alignSelf: 'flex-end',
  borderBottomRightRadius: '4px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
};

/** Assistant bubble styles (gray, aligned left) */
export const AssistantBubbleStyles: CSSProperties = {
  backgroundColor: 'rgba(244, 244, 245, 0.6)', // zinc-100/60
  color: '#18181b', // zinc-950
  alignSelf: 'flex-start',
  borderBottomLeftRadius: '4px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
};

/** Input container styles with glassmorphic effect */
export const InputContainerStyles: CSSProperties = {
  position: 'relative',
  backgroundColor: 'rgba(244, 244, 245, 0.05)', // zinc-500/5
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  transition: 'all 0.2s ease',
};

/** Default ChatWidget component styles */
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
    gap: '8px',
    padding: '16px',
  },
  inputContainer: InputContainerStyles,
  bubble: {
    maxWidth: '80%',
    position: 'relative' as const,
    wordWrap: 'break-word' as const,
    animation: 'chatBubbleAppear 0.3s ease-out',
  },
  timestamp: {
    position: 'absolute' as const,
    top: '-24px',
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 8px',
    borderRadius: '9999px',
    opacity: 0,
    transition: 'opacity 0.15s ease-out',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
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
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  attachmentButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
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
