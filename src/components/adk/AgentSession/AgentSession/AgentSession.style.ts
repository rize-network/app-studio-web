import { ViewProps } from 'app-studio';

/**
 * Default styles for AgentSession component
 * Following the app-studio design system with 4px grid, Inter/Geist fonts, and neutral palette
 */
export const DefaultAgentSessionStyles = {
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
  } as ViewProps,

  header: {
    padding: '16px',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.200',
    backgroundColor: 'color.gray.50',
    flexShrink: 0,
  } as ViewProps,

  sessionList: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: 'color.white',
    minHeight: '200px',
  } as ViewProps,

  sessionItem: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    backgroundColor: 'color.white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.blue.300',
      backgroundColor: 'color.blue.25',
    },
  } as ViewProps,

  activeSessionItem: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid',
    borderColor: 'color.blue.500',
    backgroundColor: 'color.blue.50',
    cursor: 'pointer',
  } as ViewProps,

  compactSessionItem: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    backgroundColor: 'color.white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.blue.300',
      backgroundColor: 'color.blue.25',
    },
  } as ViewProps,

  sessionInfo: {
    flex: 1,
  } as ViewProps,

  sessionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'color.gray.900',
    marginBottom: '4px',
  } as ViewProps,

  sessionDescription: {
    fontSize: '12px',
    color: 'color.gray.600',
    marginBottom: '8px',
  } as ViewProps,

  sessionMeta: {
    fontSize: '11px',
    color: 'color.gray.500',
  } as ViewProps,

  sessionActions: {
    padding: '12px 16px',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.200',
    backgroundColor: 'color.gray.100',
    flexShrink: 0,
  } as ViewProps,

  actionButton: {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'color.gray.300',
    backgroundColor: 'color.white',
    color: 'color.gray.700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.blue.400',
      backgroundColor: 'color.blue.50',
      color: 'color.blue.700',
    },
  } as ViewProps,

  deleteButton: {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'color.red.300',
    backgroundColor: 'color.white',
    color: 'color.red.700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.red.400',
      backgroundColor: 'color.red.50',
      color: 'color.red.800',
    },
  } as ViewProps,

  exportButton: {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'color.green.300',
    backgroundColor: 'color.white',
    color: 'color.green.700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.green.400',
      backgroundColor: 'color.green.50',
      color: 'color.green.800',
    },
  } as ViewProps,

  importButton: {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'color.purple.300',
    backgroundColor: 'color.white',
    color: 'color.purple.700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.purple.400',
      backgroundColor: 'color.purple.50',
      color: 'color.purple.800',
    },
  } as ViewProps,

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    padding: '32px',
  } as ViewProps,

  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    padding: '32px',
    gap: '16px',
  } as ViewProps,

  errorState: {
    padding: '16px',
    backgroundColor: 'color.red.50',
    border: '1px solid',
    borderColor: 'color.red.200',
    borderRadius: '8px',
    margin: '16px',
  } as ViewProps,

  searchInput: {
    width: '100%',
  } as ViewProps,

  filterContainer: {
    padding: '12px',
    backgroundColor: 'color.gray.50',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
  } as ViewProps,

  filterGroup: {
    marginBottom: '12px',
  } as ViewProps,

  filterLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'color.gray.700',
    marginBottom: '4px',
  } as ViewProps,

  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    marginTop: '4px',
  } as ViewProps,

  tag: {
    padding: '2px 6px',
    fontSize: '10px',
    backgroundColor: 'color.blue.100',
    color: 'color.blue.800',
    borderRadius: '4px',
    border: '1px solid',
    borderColor: 'color.blue.200',
  } as ViewProps,

  statusIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  } as ViewProps,

  activeStatus: {
    backgroundColor: 'color.green.500',
  } as ViewProps,

  inactiveStatus: {
    backgroundColor: 'color.gray.400',
  } as ViewProps,

  errorStatus: {
    backgroundColor: 'color.red.500',
  } as ViewProps,
};

/**
 * Size variants for AgentSession
 */
export const AgentSessionSizes = {
  sm: {
    container: { height: '300px' },
    sessionList: { minHeight: '150px' },
  },
  md: {
    container: { height: '400px' },
    sessionList: { minHeight: '200px' },
  },
  lg: {
    container: { height: '500px' },
    sessionList: { minHeight: '300px' },
  },
  xl: {
    container: { height: '600px' },
    sessionList: { minHeight: '400px' },
  },
};

/**
 * Theme variants for AgentSession
 */
export const AgentSessionThemes = {
  light: {
    container: { backgroundColor: 'color.white' },
    header: { backgroundColor: 'color.gray.50' },
    sessionList: { backgroundColor: 'color.white' },
    sessionActions: { backgroundColor: 'color.gray.100' },
  },
  dark: {
    container: { backgroundColor: 'color.gray.900' },
    header: { backgroundColor: 'color.gray.800' },
    sessionList: { backgroundColor: 'color.gray.900' },
    sessionActions: { backgroundColor: 'color.gray.800' },
  },
};
