import React, { useState } from 'react';
import { ProjectManagerWorker } from '../ProjectManagerWorker';
import {
  Task,
  TeamMember,
  KnowledgeSource,
  WorkflowRule,
} from '../ProjectManagerWorker/ProjectManagerWorker.props';
import { OKRObjective } from '../../OKR/OKR/OKR.props';

/**
 * Basic Example: ProjectManagerWorker with sample data
 */
export const BasicProjectManagerWorkerExample: React.FC = () => {
  // Sample OKR Objectives
  const [objectives] = useState<OKRObjective[]>([
    {
      id: 'okr-1',
      title: 'Launch AI-Powered Project Management System',
      description: 'Build and deploy a comprehensive project management system with AI agent integration',
      owner: 'Product Team',
      timeframe: 'Q1 2025',
      tags: ['ai', 'project-management', 'automation'],
      progress: 35,
      status: 'onTrack',
      keyResults: [
        {
          id: 'kr-1-1',
          title: 'Complete core component development',
          progress: 60,
          metric: 'Components',
          target: '10',
          current: '6',
          owner: 'Dev Team',
          status: 'onTrack',
          confidence: 'high',
          lastUpdated: '2025-11-15',
          tags: ['development'],
        },
        {
          id: 'kr-1-2',
          title: 'Integrate AI agent builder',
          progress: 40,
          metric: 'Integration',
          target: '100%',
          current: '40%',
          owner: 'AI Team',
          status: 'onTrack',
          confidence: 'medium',
          lastUpdated: '2025-11-14',
          tags: ['ai', 'integration'],
        },
        {
          id: 'kr-1-3',
          title: 'Achieve 90% test coverage',
          progress: 20,
          metric: 'Coverage',
          target: '90%',
          current: '20%',
          owner: 'QA Team',
          status: 'atRisk',
          confidence: 'low',
          lastUpdated: '2025-11-13',
          tags: ['testing', 'quality'],
        },
      ],
    },
    {
      id: 'okr-2',
      title: 'Improve Developer Experience',
      description: 'Enhance the developer experience with better documentation and tools',
      owner: 'DevRel Team',
      timeframe: 'Q1 2025',
      tags: ['developer-experience', 'documentation'],
      progress: 50,
      status: 'onTrack',
      keyResults: [
        {
          id: 'kr-2-1',
          title: 'Publish comprehensive component docs',
          progress: 70,
          metric: 'Pages',
          target: '50',
          current: '35',
          owner: 'Tech Writers',
          status: 'onTrack',
          confidence: 'high',
          lastUpdated: '2025-11-16',
          tags: ['documentation'],
        },
        {
          id: 'kr-2-2',
          title: 'Create interactive examples',
          progress: 30,
          metric: 'Examples',
          target: '30',
          current: '9',
          owner: 'DevRel',
          status: 'onTrack',
          confidence: 'medium',
          lastUpdated: '2025-11-15',
          tags: ['examples'],
        },
      ],
    },
  ]);

  // Sample Tasks
  const [tasks] = useState<Task[]>([
    {
      id: 'task-1',
      title: 'Implement ProjectManagerWorker component',
      description: 'Create the main component with dual board interface (OKR + Kanban)',
      status: 'done',
      priority: 'critical',
      assignmentType: 'agent',
      assignedTo: 'agent-gen-1',
      skills: ['React', 'TypeScript', 'Component Architecture'],
      dependencies: [],
      tags: ['frontend', 'component'],
      acceptanceCriteria: [
        'Component follows app-studio architecture pattern',
        'Includes OKR board integration',
        'Includes Kanban board integration',
        'Proper TypeScript types',
        'Unit tests included',
      ],
      knowledgeSources: [],
      createdAt: '2025-11-10T10:00:00Z',
      updatedAt: '2025-11-15T16:00:00Z',
      completedAt: '2025-11-15T16:00:00Z',
      estimatedHours: 16,
      actualHours: 14,
    },
    {
      id: 'task-2',
      title: 'Build agent configuration system',
      description: 'Create system to generate personalized agents using prompt templates',
      status: 'in_progress',
      priority: 'high',
      assignmentType: 'agent',
      assignedTo: 'agent-gen-2',
      skills: ['AI', 'Prompt Engineering', 'TypeScript'],
      dependencies: ['task-1'],
      tags: ['ai', 'agent-builder'],
      acceptanceCriteria: [
        'Generates agent configs from task data',
        'Uses prompt-format.md template',
        'Integrates enterprise knowledge',
        'Supports all agent types',
      ],
      knowledgeSources: [],
      createdAt: '2025-11-12T09:00:00Z',
      updatedAt: '2025-11-16T11:00:00Z',
      estimatedHours: 12,
    },
    {
      id: 'task-3',
      title: 'Design workflow automation rules',
      description: 'Define automation rules for status transitions and agent assignment',
      status: 'to_review',
      priority: 'high',
      assignmentType: 'human',
      assignedTo: 'Product Manager',
      skills: ['Product Design', 'Workflow Design'],
      dependencies: [],
      tags: ['design', 'workflow'],
      acceptanceCriteria: [
        'Rules defined for each status transition',
        'Auto-assignment logic documented',
        'Edge cases handled',
      ],
      knowledgeSources: [],
      createdAt: '2025-11-11T14:00:00Z',
      updatedAt: '2025-11-16T09:00:00Z',
      estimatedHours: 6,
      actualHours: 7,
    },
    {
      id: 'task-4',
      title: 'Write comprehensive documentation',
      description: 'Create documentation for ProjectManagerWorker component usage',
      status: 'todo',
      priority: 'medium',
      assignmentType: 'unassigned',
      skills: ['Technical Writing', 'Documentation'],
      dependencies: ['task-1', 'task-2'],
      tags: ['documentation'],
      acceptanceCriteria: [
        'Installation guide',
        'API reference',
        'Usage examples',
        'Best practices',
      ],
      knowledgeSources: [],
      createdAt: '2025-11-13T08:00:00Z',
      updatedAt: '2025-11-13T08:00:00Z',
      estimatedHours: 8,
    },
    {
      id: 'task-5',
      title: 'Add unit tests for state management',
      description: 'Write unit tests for ProjectManagerWorker state hooks',
      status: 'todo',
      priority: 'high',
      assignmentType: 'unassigned',
      skills: ['Testing', 'Jest', 'React Testing Library'],
      dependencies: ['task-1'],
      tags: ['testing'],
      acceptanceCriteria: [
        'Test all state hooks',
        'Test CRUD operations',
        'Test workflow automation',
        '90% coverage minimum',
      ],
      knowledgeSources: [],
      createdAt: '2025-11-14T10:00:00Z',
      updatedAt: '2025-11-14T10:00:00Z',
      estimatedHours: 10,
    },
    {
      id: 'task-6',
      title: 'Brainstorm new features',
      description: 'Ideation session for future enhancements and features',
      status: 'draft',
      priority: 'low',
      assignmentType: 'unassigned',
      skills: ['Product Strategy', 'Innovation'],
      dependencies: [],
      tags: ['creative', 'strategic', 'planning'],
      acceptanceCriteria: ['List of 10+ feature ideas', 'Prioritization matrix'],
      knowledgeSources: [],
      createdAt: '2025-11-15T15:00:00Z',
      updatedAt: '2025-11-15T15:00:00Z',
      estimatedHours: 4,
    },
  ]);

  // Sample Team Members
  const teamMembers: TeamMember[] = [
    {
      id: 'member-1',
      name: 'Alice Johnson',
      role: 'Senior Frontend Developer',
      skills: ['React', 'TypeScript', 'Component Architecture', 'Testing'],
      availability: 80,
      currentTasks: ['task-1'],
      email: 'alice@example.com',
    },
    {
      id: 'member-2',
      name: 'Bob Smith',
      role: 'Product Manager',
      skills: ['Product Design', 'Workflow Design', 'User Research'],
      availability: 60,
      currentTasks: ['task-3'],
      email: 'bob@example.com',
    },
    {
      id: 'member-3',
      name: 'Carol Davis',
      role: 'Technical Writer',
      skills: ['Technical Writing', 'Documentation', 'User Guides'],
      availability: 100,
      currentTasks: [],
      email: 'carol@example.com',
    },
  ];

  // Sample Knowledge Sources
  const knowledgeSources: KnowledgeSource[] = [
    {
      id: 'ks-1',
      name: 'Component Development Guide',
      type: 'documentation',
      path: '/docs/component-development/guide.md',
      priority: 'high',
      summary: 'Comprehensive guide for developing components in app-studio',
    },
    {
      id: 'ks-2',
      name: 'Coding Conventions',
      type: 'standard',
      path: '/docs/conventions.md',
      priority: 'high',
      summary: 'Coding standards and best practices',
    },
    {
      id: 'ks-3',
      name: 'Prompt Format Guide',
      type: 'documentation',
      path: '/docs/prompt-format.md',
      priority: 'high',
      summary: 'Best practices for creating effective AI prompts',
    },
    {
      id: 'ks-4',
      name: 'Prompt Agent Guide',
      type: 'documentation',
      path: '/docs/prompt-agent.md',
      priority: 'high',
      summary: 'Instructions for creating and managing AI agents',
    },
  ];

  // Sample Workflow Rules
  const workflowRules: WorkflowRule[] = [
    {
      id: 'rule-1',
      name: 'Auto-assign agent on todo',
      description:
        'When task moves to todo, automatically build and assign an agent',
      trigger: {
        event: 'status_change',
        condition: 'newStatus === "todo"',
      },
      action: {
        type: 'create_agent',
        config: {},
      },
      enabled: true,
    },
  ];

  return (
    <ProjectManagerWorker
      projectId="proj-123"
      projectName="App Studio Web - AI Project Manager"
      userId="user-123"
      teamId="team-456"
      objectives={objectives}
      tasks={tasks}
      teamMembers={teamMembers}
      knowledgeSources={knowledgeSources}
      workflowRules={workflowRules}
      enableOKRBoard={true}
      enableKanbanBoard={true}
      enableAgentBuilder={true}
      enableWorkflowAutomation={true}
      enableAnalytics={true}
      onObjectiveCreate={(objective) =>
        console.log('Objective created:', objective)
      }
      onObjectiveUpdate={(objective) =>
        console.log('Objective updated:', objective)
      }
      onTaskCreate={(task) => console.log('Task created:', task)}
      onTaskUpdate={(task) => console.log('Task updated:', task)}
      onTaskStatusChange={(taskId, newStatus) =>
        console.log('Task status changed:', taskId, newStatus)
      }
      onAgentAssign={(task, agent) =>
        console.log('Agent assigned:', task.id, agent)
      }
      onHumanAssign={(task, member) =>
        console.log('Human assigned:', task.id, member)
      }
    />
  );
};

export default BasicProjectManagerWorkerExample;
