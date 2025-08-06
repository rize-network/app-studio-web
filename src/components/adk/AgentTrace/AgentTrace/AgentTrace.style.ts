import { ViewProps } from 'app-studio';

/**
 * Default styles for AgentTrace component
 * Following the app-studio design system with 4px grid, Inter/Geist fonts, and neutral palette
 */
export const DefaultAgentTraceStyles = {
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

  timeline: {
    height: '200px',
    padding: '16px',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.200',
    backgroundColor: 'color.white',
    overflowX: 'auto',
    overflowY: 'hidden',
  } as ViewProps,

  eventList: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: 'color.white',
    padding: '16px',
  } as ViewProps,

  eventItem: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    backgroundColor: 'color.white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '8px',
    ':hover': {
      borderColor: 'color.blue.300',
      backgroundColor: 'color.blue.25',
    },
  } as ViewProps,

  selectedEventItem: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid',
    borderColor: 'color.blue.500',
    backgroundColor: 'color.blue.50',
    cursor: 'pointer',
    marginBottom: '8px',
  } as ViewProps,

  eventHeader: {
    marginBottom: '8px',
  } as ViewProps,

  eventType: {
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '600',
    borderRadius: '12px',
    textTransform: 'uppercase',
  } as ViewProps,

  eventTypeRequest: {
    backgroundColor: 'color.blue.100',
    color: 'color.blue.800',
  } as ViewProps,

  eventTypeResponse: {
    backgroundColor: 'color.green.100',
    color: 'color.green.800',
  } as ViewProps,

  eventTypeError: {
    backgroundColor: 'color.red.100',
    color: 'color.red.800',
  } as ViewProps,

  eventTypeFunction: {
    backgroundColor: 'color.purple.100',
    color: 'color.purple.800',
  } as ViewProps,

  eventTypeSystem: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',
  } as ViewProps,

  eventContent: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: 'color.gray.700',
  } as ViewProps,

  eventMetadata: {
    marginTop: '8px',
    padding: '8px',
    backgroundColor: 'color.gray.50',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'color.gray.600',
  } as ViewProps,

  eventDuration: {
    fontSize: '11px',
    color: 'color.gray.500',
    fontFamily: 'Monaco, Consolas, monospace',
  } as ViewProps,

  eventTimestamp: {
    fontSize: '11px',
    color: 'color.gray.500',
    fontFamily: 'Monaco, Consolas, monospace',
  } as ViewProps,

  metrics: {
    padding: '16px',
    borderBottom: '1px solid',
    borderBottomColor: 'color.gray.200',
    backgroundColor: 'color.gray.100',
    flexShrink: 0,
  } as ViewProps,

  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
  } as ViewProps,

  metricCard: {
    padding: '12px',
    backgroundColor: 'color.white',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    textAlign: 'center',
  } as ViewProps,

  metricValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'color.gray.900',
    marginBottom: '4px',
  } as ViewProps,

  metricLabel: {
    fontSize: '12px',
    color: 'color.gray.600',
    textTransform: 'uppercase',
    fontWeight: '600',
  } as ViewProps,

  visualization: {
    flex: 1,
    padding: '16px',
    backgroundColor: 'color.white',
    overflow: 'auto',
  } as ViewProps,

  timelineContainer: {
    position: 'relative',
    height: '100%',
    minWidth: '800px',
  } as ViewProps,

  timelineAxis: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '30px',
    borderTop: '1px solid',
    borderTopColor: 'color.gray.300',
  } as ViewProps,

  timelineEvent: {
    position: 'absolute',
    height: '20px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '600',
    color: 'white',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'scale(1.05)',
      zIndex: 10,
    },
  } as ViewProps,

  timelineSpan: {
    position: 'absolute',
    height: '30px',
    borderRadius: '6px',
    border: '2px solid',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    fontSize: '11px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
  } as ViewProps,

  filters: {
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

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    padding: '32px',
  } as ViewProps,

  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
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

  refreshButton: {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'color.blue.300',
    backgroundColor: 'color.white',
    color: 'color.blue.700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.blue.400',
      backgroundColor: 'color.blue.50',
      color: 'color.blue.800',
    },
  } as ViewProps,
};

/**
 * Event type color mapping
 */
export const EventTypeColors = {
  llm_request: 'color.blue.500',
  llm_response: 'color.green.500',
  function_call: 'color.purple.500',
  function_response: 'color.purple.300',
  user_input: 'color.orange.500',
  agent_output: 'color.teal.500',
  error: 'color.red.500',
  system: 'color.gray.500',
};

/**
 * Size variants for AgentTrace
 */
export const AgentTraceSizes = {
  sm: {
    container: { height: '400px' },
    timeline: { height: '120px' },
    eventList: { minHeight: '200px' },
  },
  md: {
    container: { height: '600px' },
    timeline: { height: '200px' },
    eventList: { minHeight: '300px' },
  },
  lg: {
    container: { height: '800px' },
    timeline: { height: '250px' },
    eventList: { minHeight: '400px' },
  },
  xl: {
    container: { height: '1000px' },
    timeline: { height: '300px' },
    eventList: { minHeight: '500px' },
  },
};

/**
 * Theme variants for AgentTrace
 */
export const AgentTraceThemes = {
  light: {
    container: { backgroundColor: 'color.white' },
    header: { backgroundColor: 'color.gray.50' },
    timeline: { backgroundColor: 'color.white' },
    eventList: { backgroundColor: 'color.white' },
    metrics: { backgroundColor: 'color.gray.100' },
  },
  dark: {
    container: { backgroundColor: 'color.gray.900' },
    header: { backgroundColor: 'color.gray.800' },
    timeline: { backgroundColor: 'color.gray.900' },
    eventList: { backgroundColor: 'color.gray.900' },
    metrics: { backgroundColor: 'color.gray.800' },
  },
};
