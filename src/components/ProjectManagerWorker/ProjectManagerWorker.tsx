import React from 'react';
import { ProjectManagerWorkerView } from './ProjectManagerWorker/ProjectManagerWorker.view';
import { useProjectManagerWorkerState } from './ProjectManagerWorker/ProjectManagerWorker.state';
import { ProjectManagerWorkerProps } from './ProjectManagerWorker/ProjectManagerWorker.props';

/**
 * ProjectManagerWorker Component
 *
 * A comprehensive project management interface combining OKR roadmap planning
 * with Kanban task management. Intelligently assigns tasks to AI agents or
 * team members based on task characteristics and complexity.
 *
 * @example
 * ```tsx
 * <ProjectManagerWorker
 *   projectId="proj-123"
 *   projectName="App Studio Web"
 *   userId="user-123"
 *   onTaskCreate={(task) => console.log('Task created:', task)}
 *   onAgentAssign={(task, agent) => console.log('Agent assigned:', agent)}
 * />
 * ```
 */
const ProjectManagerWorkerComponent: React.FC<ProjectManagerWorkerProps> = (
  props: ProjectManagerWorkerProps,
) => {
  const state = useProjectManagerWorkerState(props);
  return <ProjectManagerWorkerView {...props} {...state} />;
};

export const ProjectManagerWorker = ProjectManagerWorkerComponent;
