import { ViewProps } from 'app-studio';
import { OKRObjective } from '../../OKR/OKR/OKR.props';

/**
 * Task status flow:
 * draft → todo → in_progress → to_review → done
 */
export type TaskStatus = 'draft' | 'todo' | 'in_progress' | 'to_review' | 'done';

/**
 * Assignment type determines who executes the task
 */
export type AssignmentType = 'agent' | 'human' | 'unassigned';

/**
 * Agent types for different task categories
 */
export type AgentType =
  | 'generator'
  | 'analyzer'
  | 'reviewer'
  | 'planner'
  | 'executor'
  | 'coordinator';

/**
 * Task priority levels
 */
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

/**
 * Knowledge source for agent context
 */
export interface KnowledgeSource {
  id: string;
  name: string;
  type: 'documentation' | 'code' | 'policy' | 'standard' | 'pattern';
  path: string;
  priority: 'high' | 'medium' | 'low';
  summary?: string;
}

/**
 * AI Agent configuration
 */
export interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  role: string;
  specialty: string;
  capabilities: string[];
  knowledgeSources: KnowledgeSource[];
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Task definition
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignmentType: AssignmentType;
  assignedTo?: string; // Agent ID or team member name
  agentConfig?: AgentConfig;
  estimatedHours?: number;
  actualHours?: number;
  skills: string[];
  dependencies: string[];
  tags: string[];
  acceptanceCriteria: string[];
  knowledgeSources: KnowledgeSource[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  completedAt?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Team member definition
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: number; // 0-100%
  currentTasks: string[]; // Task IDs
  avatar?: string;
  email?: string;
}

/**
 * Workflow automation rule
 */
export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    event: 'status_change' | 'assignment' | 'creation' | 'due_date';
    condition?: string;
  };
  action: {
    type: 'create_agent' | 'notify' | 'assign' | 'update_status';
    config: Record<string, unknown>;
  };
  enabled: boolean;
}

/**
 * Project analytics data
 */
export interface ProjectAnalytics {
  totalTasks: number;
  tasksByStatus: Record<TaskStatus, number>;
  tasksByPriority: Record<TaskPriority, number>;
  agentVsHuman: {
    agent: number;
    human: number;
    unassigned: number;
  };
  completionRate: number;
  averageCompletionTime: number;
  velocity: number; // Tasks completed per week
}

/**
 * Main component props
 */
export interface ProjectManagerWorkerProps {
  // Project context
  projectId: string;
  projectName: string;
  userId: string;
  teamId?: string;

  // Data
  objectives?: OKRObjective[];
  tasks?: Task[];
  teamMembers?: TeamMember[];
  knowledgeSources?: KnowledgeSource[];
  workflowRules?: WorkflowRule[];

  // Features
  enableOKRBoard?: boolean;
  enableKanbanBoard?: boolean;
  enableAgentBuilder?: boolean;
  enableWorkflowAutomation?: boolean;
  enableAnalytics?: boolean;

  // Callbacks
  onObjectiveCreate?: (objective: OKRObjective) => void;
  onObjectiveUpdate?: (objective: OKRObjective) => void;
  onObjectiveDelete?: (objectiveId: string) => void;
  onTaskCreate?: (task: Task) => void;
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onAgentAssign?: (task: Task, agent: AgentConfig) => void;
  onHumanAssign?: (task: Task, member: TeamMember) => void;
  onWorkflowTrigger?: (rule: WorkflowRule, task: Task) => void;

  // API integration
  apiBaseUrl?: string;
  apiKey?: string;

  // Styling
  views?: ProjectManagerWorkerViewProps;
}

/**
 * View props for styling customization
 */
export interface ProjectManagerWorkerViewProps {
  container?: ViewProps;
  header?: ViewProps;
  boardContainer?: ViewProps;
  okrBoard?: ViewProps;
  kanbanBoard?: ViewProps;
  sidebar?: ViewProps;
  taskCard?: ViewProps;
  agentBuilder?: ViewProps;
  analytics?: ViewProps;
}

/**
 * View component props (includes state)
 */
export interface ProjectManagerWorkerComponentProps
  extends ProjectManagerWorkerProps {
  // State
  currentView: 'okr' | 'kanban' | 'both';
  selectedTask: Task | null;
  showAgentBuilder: boolean;
  analytics: ProjectAnalytics;

  // Handlers
  onViewChange: (view: 'okr' | 'kanban' | 'both') => void;
  onTaskSelect: (task: Task | null) => void;
  onShowAgentBuilder: (show: boolean) => void;
  handleCreateTask: (taskData: Partial<Task>) => void;
  handleUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  handleDeleteTask: (taskId: string) => void;
  handleStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  handleAssignToAgent: (task: Task) => void;
  handleAssignToHuman: (task: Task, member: TeamMember) => void;
  handleBuildAgent: (task: Task) => AgentConfig;
  handleExecuteWorkflow: (rule: WorkflowRule, task: Task) => void;
}
