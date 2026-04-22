import type { CSSProperties } from 'react';
import type { Variant, Size } from './ChatWidget.type';

/** Size mappings for the ChatWidget component */
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

/** Variant mappings for the ChatWidget component */
export const Variants: Record<Variant, CSSProperties> = {
  default: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
  },
  glassy: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(226, 232, 240, 0.9)',
    borderRadius: '12px',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
  },
  minimal: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
  },
};

/** Bubble size mappings */
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

/** User bubble styles (blue, aligned right) */
export const UserBubbleStyles: CSSProperties = {
  backgroundColor: '#1D4ED8',
  color: '#ffffff',
  alignSelf: 'flex-end',
  borderBottomRightRadius: '4px',
};

/** Assistant bubble styles (gray, aligned left) */
export const AssistantBubbleStyles: CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#0F172A',
  alignSelf: 'flex-start',
  borderBottomLeftRadius: '4px',
  border: '1px solid #E2E8F0',
};

/** Input container styles with glassmorphic effect */
export const InputContainerStyles: CSSProperties = {
  position: 'relative',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #E2E8F0',
  padding: '12px',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
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
    gap: '12px',
    padding: '16px',
    backgroundColor: '#F8FAFC',
  },
  inputContainer: InputContainerStyles,
  bubble: {
    maxWidth: '80%',
    position: 'relative' as const,
    wordWrap: 'break-word' as const,
    animation: 'chatBubbleAppear 0.25s ease-out',
    lineHeight: '1.5',
  },
  timestamp: {
    position: 'absolute' as const,
    top: '-24px',
    fontSize: '12px',
    color: '#64748B',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    padding: '2px 8px',
    borderRadius: '9999px',
    opacity: 0,
    transition: 'opacity 0.15s ease-out',
    border: '1px solid #E2E8F0',
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
