import { useState, useEffect, useCallback } from 'react';
import {
  ProjectManagerWorkerProps,
  Task,
  TaskStatus,
  AgentConfig,
  TeamMember,
  ProjectAnalytics,
  WorkflowRule,
  KnowledgeSource,
} from './ProjectManagerWorker.props';

/**
 * Custom hook for ProjectManagerWorker state management
 */
export const useProjectManagerWorkerState = (
  props: ProjectManagerWorkerProps,
) => {
  const {
    tasks: initialTasks = [],
    teamMembers = [],
    knowledgeSources = [],
    workflowRules = [],
    enableWorkflowAutomation = true,
    onTaskCreate,
    onTaskUpdate,
    onTaskDelete,
    onTaskStatusChange,
    onAgentAssign,
    onHumanAssign,
    onWorkflowTrigger,
  } = props;

  // State
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentView, setCurrentView] = useState<'okr' | 'kanban' | 'both'>(
    'both',
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAgentBuilder, setShowAgentBuilder] = useState(false);
  const [analytics, setAnalytics] = useState<ProjectAnalytics>(
    calculateAnalytics(initialTasks),
  );

  // Update analytics when tasks change
  useEffect(() => {
    setAnalytics(calculateAnalytics(tasks));
  }, [tasks]);

  // Task CRUD operations
  const handleCreateTask = useCallback(
    (taskData: Partial<Task>) => {
      const newTask: Task = {
        id: generateId('task'),
        title: taskData.title || 'Untitled Task',
        description: taskData.description || '',
        status: taskData.status || 'draft',
        priority: taskData.priority || 'medium',
        assignmentType: taskData.assignmentType || 'unassigned',
        skills: taskData.skills || [],
        dependencies: taskData.dependencies || [],
        tags: taskData.tags || [],
        acceptanceCriteria: taskData.acceptanceCriteria || [],
        knowledgeSources: taskData.knowledgeSources || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...taskData,
      } as Task;

      setTasks((prev) => [...prev, newTask]);
      onTaskCreate?.(newTask);

      // Trigger workflow automation
      if (enableWorkflowAutomation) {
        triggerWorkflows('creation', newTask);
      }

      return newTask;
    },
    [onTaskCreate, enableWorkflowAutomation, workflowRules],
  );

  const handleUpdateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            const updatedTask = {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
            onTaskUpdate?.(updatedTask);
            return updatedTask;
          }
          return task;
        }),
      );
    },
    [onTaskUpdate],
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      onTaskDelete?.(taskId);
    },
    [onTaskDelete],
  );

  const handleStatusChange = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const updates: Partial<Task> = {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      // Mark completion time
      if (newStatus === 'done' && !task.completedAt) {
        updates.completedAt = new Date().toISOString();
      }

      handleUpdateTask(taskId, updates);
      onTaskStatusChange?.(taskId, newStatus);

      // Trigger workflow automation
      if (enableWorkflowAutomation) {
        triggerWorkflows('status_change', { ...task, status: newStatus });
      }

      // When status changes to 'todo', trigger agent building
      if (newStatus === 'todo' && task.assignmentType === 'unassigned') {
        analyzeTaskForAssignment({ ...task, status: newStatus });
      }
    },
    [tasks, handleUpdateTask, onTaskStatusChange, enableWorkflowAutomation],
  );

  // Agent builder
  const handleBuildAgent = useCallback(
    (task: Task): AgentConfig => {
      const agent = buildAgentForTask(task, knowledgeSources);
      handleUpdateTask(task.id, {
        agentConfig: agent,
        assignmentType: 'agent',
        assignedTo: agent.id,
      });
      onAgentAssign?.(task, agent);
      return agent;
    },
    [knowledgeSources, handleUpdateTask, onAgentAssign],
  );

  const handleAssignToAgent = useCallback(
    (task: Task) => {
      const agent = handleBuildAgent(task);
      // In a real implementation, this would initiate the agent execution
      console.log('Agent assigned to task:', task.id, agent);
    },
    [handleBuildAgent],
  );

  const handleAssignToHuman = useCallback(
    (task: Task, member: TeamMember) => {
      handleUpdateTask(task.id, {
        assignmentType: 'human',
        assignedTo: member.id,
      });
      onHumanAssign?.(task, member);
    },
    [handleUpdateTask, onHumanAssign],
  );

  // Workflow automation
  const triggerWorkflows = useCallback(
    (event: string, task: Task) => {
      const applicableRules = workflowRules.filter(
        (rule) => rule.enabled && rule.trigger.event === event,
      );

      applicableRules.forEach((rule) => {
        handleExecuteWorkflow(rule, task);
      });
    },
    [workflowRules],
  );

  const handleExecuteWorkflow = useCallback(
    (rule: WorkflowRule, task: Task) => {
      switch (rule.action.type) {
        case 'create_agent':
          handleBuildAgent(task);
          break;
        case 'assign':
          analyzeTaskForAssignment(task);
          break;
        case 'update_status':
          if (rule.action.config.newStatus) {
            handleStatusChange(
              task.id,
              rule.action.config.newStatus as TaskStatus,
            );
          }
          break;
        case 'notify':
          // Notification logic would go here
          console.log('Notification triggered for task:', task.id);
          break;
      }
      onWorkflowTrigger?.(rule, task);
    },
    [handleBuildAgent, handleStatusChange, onWorkflowTrigger],
  );

  // Task assignment analysis
  const analyzeTaskForAssignment = useCallback(
    (task: Task) => {
      const recommendation = determineAssignmentType(task, teamMembers);

      if (recommendation === 'agent') {
        handleBuildAgent(task);
      }
      // If human, we don't auto-assign but suggest team members
    },
    [teamMembers, handleBuildAgent],
  );

  // View handlers
  const onViewChange = useCallback((view: 'okr' | 'kanban' | 'both') => {
    setCurrentView(view);
  }, []);

  const onTaskSelect = useCallback((task: Task | null) => {
    setSelectedTask(task);
  }, []);

  const onShowAgentBuilder = useCallback((show: boolean) => {
    setShowAgentBuilder(show);
  }, []);

  return {
    currentView,
    selectedTask,
    showAgentBuilder,
    analytics,
    tasks,
    onViewChange,
    onTaskSelect,
    onShowAgentBuilder,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleStatusChange,
    handleAssignToAgent,
    handleAssignToHuman,
    handleBuildAgent,
    handleExecuteWorkflow,
  };
};

/**
 * Utility: Generate unique IDs
 */
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Utility: Calculate project analytics
 */
function calculateAnalytics(tasks: Task[]): ProjectAnalytics {
  const tasksByStatus: Record<TaskStatus, number> = {
    draft: 0,
    todo: 0,
    in_progress: 0,
    to_review: 0,
    done: 0,
  };

  const tasksByPriority: Record<string, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  const agentVsHuman = {
    agent: 0,
    human: 0,
    unassigned: 0,
  };

  tasks.forEach((task) => {
    tasksByStatus[task.status]++;
    tasksByPriority[task.priority]++;
    agentVsHuman[task.assignmentType]++;
  });

  const completedTasks = tasks.filter((t) => t.status === 'done');
  const completionRate =
    tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  // Calculate average completion time
  const completionTimes = completedTasks
    .filter((t) => t.createdAt && t.completedAt)
    .map((t) => {
      const created = new Date(t.createdAt).getTime();
      const completed = new Date(t.completedAt!).getTime();
      return (completed - created) / (1000 * 60 * 60); // hours
    });

  const averageCompletionTime =
    completionTimes.length > 0
      ? completionTimes.reduce((sum, time) => sum + time, 0) /
        completionTimes.length
      : 0;

  // Calculate velocity (tasks per week)
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentlyCompleted = completedTasks.filter(
    (t) => t.completedAt && new Date(t.completedAt).getTime() > oneWeekAgo,
  );
  const velocity = recentlyCompleted.length;

  return {
    totalTasks: tasks.length,
    tasksByStatus,
    tasksByPriority: tasksByPriority as Record<
      'critical' | 'high' | 'medium' | 'low',
      number
    >,
    agentVsHuman,
    completionRate,
    averageCompletionTime,
    velocity,
  };
}

/**
 * Utility: Determine if task should be assigned to agent or human
 */
function determineAssignmentType(
  task: Task,
  teamMembers: TeamMember[],
): 'agent' | 'human' {
  // Assign to agent if:
  // - Well-defined acceptance criteria
  // - No dependencies on other in-progress tasks
  // - Skills match known agent capabilities
  // - Not requiring creative/strategic decisions

  const hasAcceptanceCriteria = task.acceptanceCriteria.length > 0;
  const hasBlockingDependencies = task.dependencies.length > 0;
  const requiresCreativity = task.tags.includes('creative');
  const requiresStrategy = task.tags.includes('strategic');
  const isWellDefined = task.description.length > 50;

  // Decision logic
  if (requiresCreativity || requiresStrategy) {
    return 'human';
  }

  if (hasAcceptanceCriteria && isWellDefined && !hasBlockingDependencies) {
    return 'agent';
  }

  // Check if team members have matching skills
  const hasMatchingHuman = teamMembers.some((member) =>
    task.skills.some((skill) => member.skills.includes(skill)),
  );

  if (hasMatchingHuman && task.priority === 'critical') {
    return 'human';
  }

  return 'agent';
}

/**
 * Utility: Build agent configuration for task
 */
function buildAgentForTask(
  task: Task,
  knowledgeSources: KnowledgeSource[],
): AgentConfig {
  // Determine agent type based on task characteristics
  const agentType = determineAgentType(task);

  // Select relevant knowledge sources
  const relevantKnowledge = selectRelevantKnowledge(task, knowledgeSources);

  // Build agent prompt using prompt-agent.md template
  const prompt = generateAgentPrompt(task, agentType, relevantKnowledge);

  return {
    id: generateId('agent'),
    name: `${agentType} for ${task.title}`,
    type: agentType,
    role: getRoleForAgentType(agentType),
    specialty: task.skills.join(', '),
    capabilities: generateCapabilities(task, agentType),
    knowledgeSources: relevantKnowledge,
    prompt,
    temperature: 0.7,
    maxTokens: 4000,
  };
}

/**
 * Utility: Determine agent type from task
 */
function determineAgentType(task: Task): AgentConfig['type'] {
  const title = task.title.toLowerCase();
  const description = task.description.toLowerCase();

  if (
    title.includes('generate') ||
    title.includes('create') ||
    title.includes('build')
  ) {
    return 'generator';
  }

  if (
    title.includes('analyze') ||
    title.includes('review') ||
    description.includes('analyze')
  ) {
    return 'analyzer';
  }

  if (title.includes('review') || title.includes('validate')) {
    return 'reviewer';
  }

  if (title.includes('plan') || title.includes('design')) {
    return 'planner';
  }

  if (title.includes('coordinate') || title.includes('manage')) {
    return 'coordinator';
  }

  return 'executor';
}

/**
 * Utility: Get role description for agent type
 */
function getRoleForAgentType(type: AgentConfig['type']): string {
  const roles = {
    generator: 'Code Generator Specialist',
    analyzer: 'Code Analysis Expert',
    reviewer: 'Technical Reviewer',
    planner: 'Technical Planning Specialist',
    executor: 'Task Execution Specialist',
    coordinator: 'Workflow Coordinator',
  };
  return roles[type];
}

/**
 * Utility: Generate agent capabilities
 */
function generateCapabilities(
  task: Task,
  agentType: AgentConfig['type'],
): string[] {
  const baseCapabilities = {
    generator: [
      'Generate production-ready code',
      'Follow coding standards',
      'Include error handling',
      'Write comprehensive tests',
    ],
    analyzer: [
      'Analyze code quality',
      'Identify security issues',
      'Assess performance',
      'Recommend improvements',
    ],
    reviewer: [
      'Review code changes',
      'Validate against standards',
      'Provide constructive feedback',
      'Ensure quality gates',
    ],
    planner: [
      'Break down requirements',
      'Identify dependencies',
      'Estimate effort',
      'Create task sequences',
    ],
    executor: [
      'Execute defined tasks',
      'Follow specifications',
      'Report progress',
      'Handle errors gracefully',
    ],
    coordinator: [
      'Manage task dependencies',
      'Coordinate team activities',
      'Track progress',
      'Resolve blockers',
    ],
  };

  return [...baseCapabilities[agentType], ...task.skills.map((s) => s)];
}

/**
 * Utility: Select relevant knowledge sources
 */
function selectRelevantKnowledge(
  task: Task,
  allKnowledge: KnowledgeSource[],
): KnowledgeSource[] {
  // If task specifies knowledge sources, use those
  if (task.knowledgeSources.length > 0) {
    return task.knowledgeSources;
  }

  // Otherwise, select based on task skills and tags
  return allKnowledge.filter(
    (source) =>
      source.priority === 'high' ||
      task.skills.some((skill) =>
        source.summary?.toLowerCase().includes(skill.toLowerCase()),
      ),
  );
}

/**
 * Utility: Generate agent prompt
 */
function generateAgentPrompt(
  task: Task,
  agentType: AgentConfig['type'],
  knowledgeSources: KnowledgeSource[],
): string {
  return `# ${getRoleForAgentType(agentType)} Agent

## Identity
You are a ${getRoleForAgentType(agentType)} with expertise in ${task.skills.join(', ')}.

## Current Task
**Task ID**: ${task.id}
**Title**: ${task.title}
**Description**: ${task.description}
**Priority**: ${task.priority}

## Requirements
${task.acceptanceCriteria.map((criterion, i) => `${i + 1}. ${criterion}`).join('\n')}

## Knowledge Sources
You have access to the following knowledge sources:
${knowledgeSources
  .map(
    (source) =>
      `- **${source.name}** (${source.type}, Priority: ${source.priority})
  Path: ${source.path}
  ${source.summary ? `Summary: ${source.summary}` : ''}`,
  )
  .join('\n')}

## Execution Guidelines
1. Review all knowledge sources before starting
2. Follow established patterns and standards
3. Include comprehensive error handling
4. Document all decisions and trade-offs
5. Validate output against acceptance criteria

## Quality Standards
- Meets all acceptance criteria
- Follows coding standards from knowledge sources
- Includes appropriate testing
- Properly documented
- Production-ready quality

## Output Requirements
Provide:
1. Primary deliverable (code, analysis, plan, etc.)
2. Documentation of approach
3. Any assumptions made
4. Validation results
5. Known limitations or follow-up items

Begin execution when ready.`;
}
