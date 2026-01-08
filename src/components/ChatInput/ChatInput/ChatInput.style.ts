import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from './ChatInput.type';

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
    lineHeight: 15,
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
 * Default styles for the ChatInput component
 */
export const DefaultChatInputStyles = {
  container: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: '12px',
    backgroundColor: 'color.white',
    transition: 'all 0.2s ease',
    media: {
      mobile: {
        borderRadius: '8px',
      },
    },
  },
  content: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: 'color.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    media: {
      mobile: {
        padding: '10px',
        borderRadius: '8px',
      },
    },
  },
  textarea: {
    width: '100%',
    minHeight: '40px',
    maxHeight: '200px',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '15px',
    color: 'color.gray.900',
    backgroundColor: 'color.white',
    border: 'none',
    outline: 'none',
    resize: 'none',
    overflow: 'auto',
    media: {
      mobile: {
        padding: '6px 10px',
        fontSize: '13px',
        minHeight: '36px',
      },
    },
  },
  attachments: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    padding: '8px 0',
  },
  attachmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    borderRadius: '6px',
    backgroundColor: 'color.gray.100',
  },
  attachmentName: {
    fontSize: '12px',
    fontWeight: '500',
    color: 'color.gray.700',
  },
  attachmentSize: {
    fontSize: '10px',
    color: 'color.gray.500',
  },
  attachmentRemove: {
    padding: '2px',
    borderRadius: '50%',
    cursor: 'pointer',
    color: 'color.gray.500',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  submitButton: {
    height: '36px',
    minWidth: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    backgroundColor: 'theme.primary',
    color: 'color.white',
    transition: 'all 0.2s ease',
    media: {
      mobile: {
        height: '32px',
        minWidth: '32px',
        padding: '0 10px',
      },
    },
  },
  fileButton: {
    height: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'color.gray.500',
    transition: 'all 0.2s ease',
    media: {
      mobile: {
        height: '32px',
        padding: '0 10px',
      },
    },
  },
  modelSelector: {
    height: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'color.gray.500',
    transition: 'all 0.2s ease',
  },
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 0',
  },
};

/**
 * Shape styles for the ChatInput component
 */
export const Shapes: Record<Shape, ViewProps> = {
  default: {
    borderRadius: '8px',
  },
  square: {
    borderRadius: '0px',
  },
  rounded: {
    borderRadius: '8px',
  },
};

/**
 * Size styles for the ChatInput component
 */
export const Sizes: Record<Size, ViewProps> = {
  xs: {
    fontSize: '10px',
    padding: '4px 8px',
  },
  sm: {
    fontSize: '12px',
    padding: '6px 10px',
  },
  md: {
    fontSize: '14px',
    padding: '8px 12px',
  },
  lg: {
    fontSize: '16px',
    padding: '10px 14px',
  },
  xl: {
    fontSize: '20px',
    padding: '12px 16px',
  },
};

/**
 * Variant styles for the ChatInput component
 */
export const Variants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.300',
  },
  none: {
    backgroundColor: 'transparent',
    border: 'none',
  },
};
