import { ViewProps } from 'app-studio';

/**
 * Default styles for AgentEval component
 * Following the app-studio design system with 4px grid, Inter/Geist fonts, and neutral palette
 */
export const DefaultAgentEvalStyles = {
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

  evaluationList: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: 'color.white',
    padding: '16px',
  } as ViewProps,

  evaluationItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    backgroundColor: 'color.white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '12px',
    ':hover': {
      borderColor: 'color.blue.300',
      backgroundColor: 'color.blue.25',
    },
  } as ViewProps,

  activeEvaluationItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid',
    borderColor: 'color.blue.500',
    backgroundColor: 'color.blue.50',
    cursor: 'pointer',
    marginBottom: '12px',
  } as ViewProps,

  evaluationHeader: {
    marginBottom: '12px',
  } as ViewProps,

  evaluationTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'color.gray.900',
    marginBottom: '4px',
  } as ViewProps,

  evaluationMeta: {
    fontSize: '12px',
    color: 'color.gray.500',
  } as ViewProps,

  statusBadge: {
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: '600',
    borderRadius: '12px',
    textTransform: 'uppercase',
  } as ViewProps,

  statusPending: {
    backgroundColor: 'color.gray.100',
    color: 'color.gray.800',
  } as ViewProps,

  statusRunning: {
    backgroundColor: 'color.blue.100',
    color: 'color.blue.800',
  } as ViewProps,

  statusCompleted: {
    backgroundColor: 'color.green.100',
    color: 'color.green.800',
  } as ViewProps,

  statusFailed: {
    backgroundColor: 'color.red.100',
    color: 'color.red.800',
  } as ViewProps,

  statusCancelled: {
    backgroundColor: 'color.yellow.100',
    color: 'color.yellow.800',
  } as ViewProps,

  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'color.gray.200',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '8px',
  } as ViewProps,

  progressFill: {
    height: '100%',
    backgroundColor: 'color.blue.500',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  } as ViewProps,

  evaluationActions: {
    marginTop: '12px',
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
    marginRight: '8px',
    ':hover': {
      borderColor: 'color.blue.400',
      backgroundColor: 'color.blue.50',
      color: 'color.blue.700',
    },
  } as ViewProps,

  startButton: {
    borderColor: 'color.green.300',
    color: 'color.green.700',
    ':hover': {
      borderColor: 'color.green.400',
      backgroundColor: 'color.green.50',
      color: 'color.green.800',
    },
  } as ViewProps,

  cancelButton: {
    borderColor: 'color.red.300',
    color: 'color.red.700',
    ':hover': {
      borderColor: 'color.red.400',
      backgroundColor: 'color.red.50',
      color: 'color.red.800',
    },
  } as ViewProps,

  deleteButton: {
    borderColor: 'color.red.300',
    color: 'color.red.700',
    ':hover': {
      borderColor: 'color.red.400',
      backgroundColor: 'color.red.50',
      color: 'color.red.800',
    },
  } as ViewProps,

  createPanel: {
    flex: 1,
    padding: '24px',
    backgroundColor: 'color.white',
    overflowY: 'auto',
  } as ViewProps,

  formGroup: {
    marginBottom: '20px',
  } as ViewProps,

  formLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'color.gray.700',
    marginBottom: '8px',
    display: 'block',
  } as ViewProps,

  formInput: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid',
    borderColor: 'color.gray.300',
    borderRadius: '6px',
    fontSize: '14px',
  } as ViewProps,

  formTextarea: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid',
    borderColor: 'color.gray.300',
    borderRadius: '6px',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'vertical',
  } as ViewProps,

  resultsPanel: {
    flex: 1,
    padding: '16px',
    backgroundColor: 'color.white',
    overflowY: 'auto',
  } as ViewProps,

  resultsSummary: {
    padding: '16px',
    backgroundColor: 'color.gray.50',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    marginBottom: '20px',
  } as ViewProps,

  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '16px',
  } as ViewProps,

  summaryCard: {
    textAlign: 'center',
  } as ViewProps,

  summaryValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'color.gray.900',
    marginBottom: '4px',
  } as ViewProps,

  summaryLabel: {
    fontSize: '12px',
    color: 'color.gray.600',
    textTransform: 'uppercase',
    fontWeight: '600',
  } as ViewProps,

  testCaseList: {
    marginTop: '20px',
  } as ViewProps,

  testCaseItem: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'color.gray.200',
    backgroundColor: 'color.white',
    marginBottom: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'color.blue.300',
      backgroundColor: 'color.blue.25',
    },
  } as ViewProps,

  testCaseHeader: {
    marginBottom: '8px',
  } as ViewProps,

  testCaseName: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'color.gray.900',
  } as ViewProps,

  testCaseStatus: {
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
  } as ViewProps,

  testCasePass: {
    color: 'color.green.700',
  } as ViewProps,

  testCaseFail: {
    color: 'color.red.700',
  } as ViewProps,

  testCaseError: {
    color: 'color.orange.700',
  } as ViewProps,

  testCaseSkip: {
    color: 'color.gray.600',
  } as ViewProps,

  metricsPanel: {
    flex: 1,
    padding: '16px',
    backgroundColor: 'color.white',
    overflowY: 'auto',
  } as ViewProps,

  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  } as ViewProps,

  metricCard: {
    padding: '16px',
    backgroundColor: 'color.white',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color.gray.200',
  } as ViewProps,

  metricTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'color.gray.700',
    marginBottom: '8px',
  } as ViewProps,

  metricValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'color.gray.900',
  } as ViewProps,

  metricChange: {
    fontSize: '12px',
    marginTop: '4px',
  } as ViewProps,

  metricIncrease: {
    color: 'color.green.600',
  } as ViewProps,

  metricDecrease: {
    color: 'color.red.600',
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
 * Size variants for AgentEval
 */
export const AgentEvalSizes = {
  sm: {
    container: { height: '400px' },
    evaluationList: { minHeight: '200px' },
  },
  md: {
    container: { height: '600px' },
    evaluationList: { minHeight: '300px' },
  },
  lg: {
    container: { height: '800px' },
    evaluationList: { minHeight: '400px' },
  },
  xl: {
    container: { height: '1000px' },
    evaluationList: { minHeight: '500px' },
  },
};

/**
 * Theme variants for AgentEval
 */
export const AgentEvalThemes = {
  light: {
    container: { backgroundColor: 'color.white' },
    header: { backgroundColor: 'color.gray.50' },
    evaluationList: { backgroundColor: 'color.white' },
    createPanel: { backgroundColor: 'color.white' },
    resultsPanel: { backgroundColor: 'color.white' },
    metricsPanel: { backgroundColor: 'color.white' },
  },
  dark: {
    container: { backgroundColor: 'color.gray.900' },
    header: { backgroundColor: 'color.gray.800' },
    evaluationList: { backgroundColor: 'color.gray.900' },
    createPanel: { backgroundColor: 'color.gray.900' },
    resultsPanel: { backgroundColor: 'color.gray.900' },
    metricsPanel: { backgroundColor: 'color.gray.900' },
  },
};
