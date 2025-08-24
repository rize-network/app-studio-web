import { ViewProps } from 'app-studio';

/**
 * Default styles for AgentChat component
 * Following the app-studio design system with 4px grid, Inter/Geist fonts, and neutral palette
 */
export const DefaultAgentChatStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'color.white',
    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif',
    position: 'relative',
  } as ViewProps,

  header: {
    padding: '16px',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.200',
    backgroundColor: 'color.gray.50',
    flexShrink: 0,
  } as ViewProps,

  messageList: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: 'color.white',
    minHeight: '300px',
    maxHeight: '600px',
  } as ViewProps,

  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    padding: '32px',
  } as ViewProps,

  inputArea: {
    padding: '16px',
    borderTop: '1px solid',
    borderTopColor: 'color.gray.200',
    backgroundColor: 'color.gray.50',
    flexShrink: 0,
  } as ViewProps,

  attachmentArea: {
    padding: '12px 16px',
    borderTop: '1px solid',
    borderTopColor: 'color.gray.200',
    backgroundColor: 'color.gray.100',
    flexShrink: 0,
  } as ViewProps,

  message: {
    padding: '12px',
    borderRadius: '8px',
    maxWidth: '80%',
    wordBreak: 'break-word',
  } as ViewProps,

  userMessage: {
    backgroundColor: 'color.blue.500',
    color: 'white',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  } as ViewProps,

  botMessage: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.900',
    alignSelf: 'flex-start',
    marginRight: 'auto',
  } as ViewProps,

  thoughtMessage: {
    backgroundColor: 'color.yellow.50',
    color: 'color.yellow.800',
    border: '1px solid',
    borderColor: 'color.yellow.200',
    fontStyle: 'italic',
  } as ViewProps,

  loadingMessage: {
    backgroundColor: 'color.gray.50',
    color: 'color.gray.600',
    border: '1px dashed',
    borderColor: 'color.gray.300',
  } as ViewProps,

  messageHeader: {
    marginBottom: '4px',
  } as ViewProps,

  messageContent: {
    lineHeight: 1.5,
  } as ViewProps,

  messageFooter: {
    marginTop: '8px',
  } as ViewProps,

  timestamp: {
    fontSize: '12px',
    color: 'color.gray.500',
    marginTop: '4px',
  } as ViewProps,

  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'color.gray.300',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    flexShrink: 0,
  } as ViewProps,

  userAvatar: {
    backgroundColor: 'color.blue.500',
  } as ViewProps,

  botAvatar: {
    backgroundColor: 'color.green.500',
  } as ViewProps,

  attachmentPreview: {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '60px',
    backgroundColor: 'color.gray.100',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    overflow: 'hidden',
    cursor: 'pointer',
  } as ViewProps,

  attachmentRemove: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'color.black.900',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    zIndex: 1,
  } as ViewProps,

  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'color.gray.100',
    borderRadius: '8px',
    maxWidth: '80px',
    alignSelf: 'flex-start',
  } as ViewProps,

  typingDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'color.gray.500',
  } as ViewProps,

  functionCall: {
    backgroundColor: 'color.purple.50',
    border: '1px solid',
    borderColor: 'color.purple.200',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '8px',
  } as ViewProps,

  functionResponse: {
    backgroundColor: 'color.green.50',
    border: '1px solid',
    borderColor: 'color.green.200',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '8px',
  } as ViewProps,

  codeBlock: {
    backgroundColor: 'color.gray.900',
    color: 'color.gray.100',
    borderRadius: '8px',
    padding: '12px',
    fontFamily: 'Monaco, Consolas, monospace',
    fontSize: '14px',
    overflow: 'auto',
    marginTop: '8px',
  } as ViewProps,

  inlineData: {
    marginTop: '8px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: 'color.gray.200',
  } as ViewProps,

  errorMessage: {
    backgroundColor: 'color.red.50',
    color: 'color.red.800',
    border: '1px solid',
    borderColor: 'color.red.200',
    borderRadius: '8px',
    padding: '12px',
    margin: '8px 16px',
  } as ViewProps,

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  } as ViewProps,

  runProgress: {
    padding: '12px 16px',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.200',
    backgroundColor: 'color.gray.50',
  } as ViewProps,
};

/**
 * Animation styles for typing indicator
 */
export const TypingAnimationStyles = {
  dot1: {
    animationDelay: '0ms',
  },
  dot2: {
    animationDelay: '150ms',
  },
  dot3: {
    animationDelay: '300ms',
  },
};

/**
 * Responsive breakpoints for AgentChat
 */
export const AgentChatBreakpoints = {
  mobile: '(max-width: 768px)',
  tablet: '(max-width: 1024px)',
  desktop: '(min-width: 1025px)',
};

/**
 * Size variants for AgentChat
 */
export const AgentChatSizes = {
  sm: {
    container: { height: '400px' },
    messageList: { minHeight: '200px', maxHeight: '300px' },
  },
  md: {
    container: { height: '500px' },
    messageList: { minHeight: '300px', maxHeight: '400px' },
  },
  lg: {
    container: { height: '600px' },
    messageList: { minHeight: '400px', maxHeight: '500px' },
  },
  xl: {
    container: { height: '700px' },
    messageList: { minHeight: '500px', maxHeight: '600px' },
  },
};

/**
 * Theme variants for AgentChat
 */
export const AgentChatThemes = {
  light: {
    container: { backgroundColor: 'color.white' },
    header: { backgroundColor: 'color.gray.50' },
    messageList: { backgroundColor: 'color.white' },
    inputArea: { backgroundColor: 'color.gray.50' },
  },
  dark: {
    container: { backgroundColor: 'color.gray.900' },
    header: { backgroundColor: 'color.gray.800' },
    messageList: { backgroundColor: 'color.gray.900' },
    inputArea: { backgroundColor: 'color.gray.800' },
  },
};
