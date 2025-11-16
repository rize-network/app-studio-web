import React from 'react';
import { View, Horizontal, Vertical, Text, Button } from 'app-studio';
import { OKR } from '../../OKR/OKR';
import { KanbanBoard } from '../../KanbanBoard/KanbanBoard';
import { ProjectManagerWorkerComponentProps } from './ProjectManagerWorker.props';
import {
  getTheme,
  STATUS_METADATA,
  PRIORITY_METADATA,
  ASSIGNMENT_METADATA,
  LAYOUT,
  TYPOGRAPHY,
} from './ProjectManagerWorker.style';
import { TaskCard } from './TaskCard';
import { AgentBuilderPanel } from './AgentBuilderPanel';
import { AnalyticsDashboard } from './AnalyticsDashboard';

/**
 * ProjectManagerWorker View Component
 * Renders the dual-board interface with OKR and Kanban boards
 */
export const ProjectManagerWorkerView: React.FC<
  ProjectManagerWorkerComponentProps
> = (props) => {
  const {
    projectName,
    currentView,
    tasks = [],
    objectives = [],
    teamMembers = [],
    selectedTask,
    showAgentBuilder,
    analytics,
    enableOKRBoard = true,
    enableKanbanBoard = true,
    enableAnalytics = true,
    views = {},
    onViewChange,
    onTaskSelect,
    onShowAgentBuilder,
    handleCreateTask,
    handleUpdateTask,
    handleStatusChange,
    handleAssignToAgent,
    handleAssignToHuman,
    handleBuildAgent,
  } = props;

  const theme = getTheme('light');

  // Convert tasks to Kanban columns
  const kanbanColumns = [
    {
      id: 'draft',
      title: `${STATUS_METADATA.draft.icon} Draft`,
      cards: tasks
        .filter((t) => t.status === 'draft')
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          metadata: task,
        })),
    },
    {
      id: 'todo',
      title: `${STATUS_METADATA.todo.icon} To Do`,
      cards: tasks
        .filter((t) => t.status === 'todo')
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          metadata: task,
        })),
      footer: (
        <Text size="sm" color="color.gray.600" style={{ marginTop: 8 }}>
          User must validate to start
        </Text>
      ),
    },
    {
      id: 'in_progress',
      title: `${STATUS_METADATA.in_progress.icon} In Progress`,
      cards: tasks
        .filter((t) => t.status === 'in_progress')
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          metadata: task,
        })),
    },
    {
      id: 'to_review',
      title: `${STATUS_METADATA.to_review.icon} To Review`,
      cards: tasks
        .filter((t) => t.status === 'to_review')
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          metadata: task,
        })),
      footer: (
        <Text size="sm" color="color.gray.600" style={{ marginTop: 8 }}>
          User must review to complete
        </Text>
      ),
    },
    {
      id: 'done',
      title: `${STATUS_METADATA.done.icon} Done`,
      cards: tasks
        .filter((t) => t.status === 'done')
        .map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          metadata: task,
        })),
    },
  ];

  // Handle Kanban column changes
  const handleKanbanChange = (columns: any[]) => {
    // Extract status changes
    columns.forEach((column) => {
      column.cards.forEach((card: any) => {
        const task = card.metadata;
        if (task.status !== column.id) {
          handleStatusChange(task.id, column.id);
        }
      });
    });
  };

  return (
    <Vertical {...theme.container} {...views.container} height="100vh">
      {/* Header */}
      <Horizontal
        {...theme.header}
        {...views.header}
        height={LAYOUT.headerHeight}
        justifyContent="space-between"
        alignItems="center"
      >
        <Vertical gap={4}>
          <Text style={TYPOGRAPHY.title}>{projectName}</Text>
          <Text style={TYPOGRAPHY.caption} color="color.gray.600">
            Project Manager Worker
          </Text>
        </Vertical>

        <Horizontal gap={12} alignItems="center">
          {/* View Toggle */}
          <Horizontal gap={8}>
            <Button
              size="sm"
              variant={currentView === 'okr' ? 'primary' : 'secondary'}
              onClick={() => onViewChange('okr')}
            >
              OKR Roadmap
            </Button>
            <Button
              size="sm"
              variant={currentView === 'kanban' ? 'primary' : 'secondary'}
              onClick={() => onViewChange('kanban')}
            >
              Kanban Board
            </Button>
            <Button
              size="sm"
              variant={currentView === 'both' ? 'primary' : 'secondary'}
              onClick={() => onViewChange('both')}
            >
              Both
            </Button>
          </Horizontal>

          {/* Analytics Toggle */}
          {enableAnalytics && (
            <Button
              size="sm"
              variant="tertiary"
              onClick={() => {
                /* Toggle analytics */
              }}
            >
              📊 Analytics
            </Button>
          )}

          {/* Create Task */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              const newTask = {
                title: 'New Task',
                description: '',
                status: 'draft' as const,
                priority: 'medium' as const,
              };
              handleCreateTask(newTask);
            }}
          >
            + New Task
          </Button>
        </Horizontal>
      </Horizontal>

      {/* Main Content */}
      <Horizontal flex={1} overflow="hidden">
        {/* Left Side: Boards */}
        <Vertical
          flex={1}
          {...theme.boardContainer}
          {...views.boardContainer}
          overflow="auto"
        >
          {/* Analytics Dashboard */}
          {enableAnalytics && (
            <AnalyticsDashboard analytics={analytics} views={views} />
          )}

          {/* OKR Board */}
          {enableOKRBoard && (currentView === 'okr' || currentView === 'both') && (
            <Vertical {...theme.okrBoard} {...views.okrBoard}>
              <Text style={TYPOGRAPHY.subtitle} marginBottom={16}>
                🎯 OKR Roadmap & Deliverables
              </Text>
              <OKR
                objectives={objectives}
                onChange={(newObjectives) => {
                  // Handle objective changes
                  console.log('Objectives updated:', newObjectives);
                }}
              />
            </Vertical>
          )}

          {/* Kanban Board */}
          {enableKanbanBoard &&
            (currentView === 'kanban' || currentView === 'both') && (
              <Vertical {...theme.kanbanBoard} {...views.kanbanBoard}>
                <Horizontal justifyContent="space-between" marginBottom={16}>
                  <Text style={TYPOGRAPHY.subtitle}>
                    📋 Task Management Board
                  </Text>
                  <Horizontal gap={8} alignItems="center">
                    <Text style={TYPOGRAPHY.caption} color="color.gray.600">
                      {ASSIGNMENT_METADATA.agent.icon} Agent Tasks:{' '}
                      {analytics.agentVsHuman.agent}
                    </Text>
                    <Text style={TYPOGRAPHY.caption} color="color.gray.600">
                      {ASSIGNMENT_METADATA.human.icon} Human Tasks:{' '}
                      {analytics.agentVsHuman.human}
                    </Text>
                  </Horizontal>
                </Horizontal>

                <KanbanBoard
                  columns={kanbanColumns}
                  onChange={handleKanbanChange}
                  renderCard={(card, column) => (
                    <TaskCard
                      task={card.metadata}
                      onSelect={() => onTaskSelect(card.metadata)}
                      onAssignAgent={() => handleAssignToAgent(card.metadata)}
                      onAssignHuman={(member) =>
                        handleAssignToHuman(card.metadata, member)
                      }
                      teamMembers={teamMembers}
                      views={views}
                    />
                  )}
                  renderColumnHeader={(column) => (
                    <Horizontal
                      justifyContent="space-between"
                      alignItems="center"
                      marginBottom={12}
                    >
                      <Text style={TYPOGRAPHY.subtitle}>{column.title}</Text>
                      <View
                        padding="4px 8px"
                        backgroundColor="color.gray.200"
                        borderRadius={12}
                      >
                        <Text style={TYPOGRAPHY.caption}>
                          {column.cards.length}
                        </Text>
                      </View>
                    </Horizontal>
                  )}
                />

                {/* Column Footer Instructions */}
                <Horizontal
                  marginTop={16}
                  padding={12}
                  backgroundColor="color.blue.50"
                  borderRadius={6}
                  gap={8}
                >
                  <Text size="sm" color="color.blue.900">
                    ℹ️ <strong>Workflow:</strong> Draft → To Do (validate) →
                    In Progress (auto-build agent/workflow) → To Review
                    (validate) → Done
                  </Text>
                </Horizontal>
              </Vertical>
            )}
        </Vertical>

        {/* Right Sidebar: Agent Builder / Task Details */}
        {(selectedTask || showAgentBuilder) && (
          <Vertical
            width={LAYOUT.sidebarWidth}
            {...theme.sidebar}
            {...views.sidebar}
            overflow="auto"
          >
            {selectedTask && (
              <AgentBuilderPanel
                task={selectedTask}
                onClose={() => onTaskSelect(null)}
                onBuildAgent={() => handleBuildAgent(selectedTask)}
                onAssignAgent={() => handleAssignToAgent(selectedTask)}
                views={views}
              />
            )}
          </Vertical>
        )}
      </Horizontal>
    </Vertical>
  );
};
