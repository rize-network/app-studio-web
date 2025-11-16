import { ViewProps } from 'app-studio';
import { TaskStatus, TaskPriority, AssignmentType } from './ProjectManagerWorker.props';

/**
 * Theme configuration for ProjectManagerWorker
 */
export const getTheme = (mode: 'light' | 'dark' = 'light') => {
  const isLight = mode === 'light';

  return {
    // Main container
    container: {
      backgroundColor: isLight ? 'color.gray.50' : 'color.gray.900',
      color: isLight ? 'color.gray.900' : 'color.gray.50',
    } as ViewProps,

    // Header
    header: {
      backgroundColor: isLight ? 'color.white' : 'color.gray.800',
      borderBottom: `1px solid ${isLight ? 'color.gray.200' : 'color.gray.700'}`,
      padding: 20,
    } as ViewProps,

    // Board container
    boardContainer: {
      backgroundColor: 'transparent',
      padding: 20,
      gap: 20,
    } as ViewProps,

    // OKR Board
    okrBoard: {
      backgroundColor: isLight ? 'color.white' : 'color.gray.800',
      borderRadius: 8,
      padding: 20,
      border: `1px solid ${isLight ? 'color.gray.200' : 'color.gray.700'}`,
    } as ViewProps,

    // Kanban Board
    kanbanBoard: {
      backgroundColor: isLight ? 'color.white' : 'color.gray.800',
      borderRadius: 8,
      padding: 20,
      border: `1px solid ${isLight ? 'color.gray.200' : 'color.gray.700'}`,
    } as ViewProps,

    // Task Card
    taskCard: {
      backgroundColor: isLight ? 'color.white' : 'color.gray.700',
      borderRadius: 6,
      padding: 12,
      border: `1px solid ${isLight ? 'color.gray.300' : 'color.gray.600'}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    } as ViewProps,

    taskCardHover: {
      boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
      transform: 'translateY(-2px)',
    } as ViewProps,

    // Sidebar
    sidebar: {
      backgroundColor: isLight ? 'color.gray.100' : 'color.gray.800',
      borderLeft: `1px solid ${isLight ? 'color.gray.200' : 'color.gray.700'}`,
      padding: 20,
    } as ViewProps,

    // Agent Builder
    agentBuilder: {
      backgroundColor: isLight ? 'color.white' : 'color.gray.800',
      borderRadius: 8,
      padding: 24,
      border: `1px solid ${isLight ? 'color.gray.200' : 'color.gray.700'}`,
    } as ViewProps,

    // Analytics
    analytics: {
      backgroundColor: isLight ? 'color.blue.50' : 'color.blue.900',
      borderRadius: 8,
      padding: 16,
      border: `1px solid ${isLight ? 'color.blue.200' : 'color.blue.700'}`,
    } as ViewProps,
  };
};

/**
 * Status metadata for styling and display
 */
export const STATUS_METADATA: Record<
  TaskStatus,
  {
    label: string;
    color: string;
    backgroundColor: string;
    borderColor: string;
    icon: string;
  }
> = {
  draft: {
    label: 'Draft',
    color: 'color.gray.700',
    backgroundColor: 'color.gray.100',
    borderColor: 'color.gray.300',
    icon: '📝',
  },
  todo: {
    label: 'To Do',
    color: 'color.blue.700',
    backgroundColor: 'color.blue.100',
    borderColor: 'color.blue.300',
    icon: '📋',
  },
  in_progress: {
    label: 'In Progress',
    color: 'color.yellow.700',
    backgroundColor: 'color.yellow.100',
    borderColor: 'color.yellow.300',
    icon: '⚙️',
  },
  to_review: {
    label: 'To Review',
    color: 'color.purple.700',
    backgroundColor: 'color.purple.100',
    borderColor: 'color.purple.300',
    icon: '👀',
  },
  done: {
    label: 'Done',
    color: 'color.green.700',
    backgroundColor: 'color.green.100',
    borderColor: 'color.green.300',
    icon: '✅',
  },
};

/**
 * Priority metadata for styling and display
 */
export const PRIORITY_METADATA: Record<
  TaskPriority,
  {
    label: string;
    color: string;
    backgroundColor: string;
    icon: string;
  }
> = {
  critical: {
    label: 'Critical',
    color: 'color.red.700',
    backgroundColor: 'color.red.100',
    icon: '🔴',
  },
  high: {
    label: 'High',
    color: 'color.orange.700',
    backgroundColor: 'color.orange.100',
    icon: '🟠',
  },
  medium: {
    label: 'Medium',
    color: 'color.yellow.700',
    backgroundColor: 'color.yellow.100',
    icon: '🟡',
  },
  low: {
    label: 'Low',
    color: 'color.green.700',
    backgroundColor: 'color.green.100',
    icon: '🟢',
  },
};

/**
 * Assignment type metadata
 */
export const ASSIGNMENT_METADATA: Record<
  AssignmentType,
  {
    label: string;
    color: string;
    backgroundColor: string;
    icon: string;
  }
> = {
  agent: {
    label: 'Agent',
    color: 'color.purple.700',
    backgroundColor: 'color.purple.100',
    icon: '🤖',
  },
  human: {
    label: 'Human',
    color: 'color.blue.700',
    backgroundColor: 'color.blue.100',
    icon: '👤',
  },
  unassigned: {
    label: 'Unassigned',
    color: 'color.gray.700',
    backgroundColor: 'color.gray.100',
    icon: '❓',
  },
};

/**
 * Layout constants
 */
export const LAYOUT = {
  headerHeight: 60,
  sidebarWidth: 320,
  taskCardMinWidth: 280,
  taskCardMaxWidth: 400,
  boardGap: 20,
  columnWidth: 300,
};

/**
 * Typography
 */
export const TYPOGRAPHY = {
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  body: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.4,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.4,
    textTransform: 'uppercase' as const,
  },
};

/**
 * Animation constants
 */
export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  },
};
