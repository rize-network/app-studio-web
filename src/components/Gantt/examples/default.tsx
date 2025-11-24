import React from 'react';
import { Gantt, GanttMilestone } from '../Gantt';

const sampleMilestones: GanttMilestone[] = [
  {
    id: 'v1.0',
    title: 'Version 1.0',
    icon: '🚀',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    color: 'blue',
    tasks: [
      {
        id: 'PROJ-001',
        title: 'Setup project infrastructure',
        icon: '⚙️',
        status: 'done',
        progress: 100,
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        color: 'green',
        checked: true,
      },
      {
        id: 'PROJ-002',
        title: 'Design system architecture',
        icon: '📐',
        status: 'done',
        progress: 100,
        startDate: '2024-01-03',
        endDate: '2024-01-10',
        color: 'blue',
        checked: true,
      },
      {
        id: 'PROJ-003',
        title: 'Implement core features',
        icon: '💻',
        status: 'in_progress',
        progress: 65,
        startDate: '2024-01-08',
        endDate: '2024-01-20',
        color: 'purple',
        checked: false,
      },
      {
        id: 'PROJ-004',
        title: 'Write documentation',
        icon: '📝',
        status: 'todo',
        progress: 0,
        startDate: '2024-01-18',
        endDate: '2024-01-25',
        color: 'orange',
        checked: false,
      },
      {
        id: 'PROJ-005',
        title: 'Testing and QA',
        icon: '🧪',
        status: 'todo',
        progress: 0,
        startDate: '2024-01-22',
        endDate: '2024-01-30',
        color: 'red',
        checked: false,
      },
    ],
  },
  {
    id: 'v1.1',
    title: 'Version 1.1',
    icon: '⭐',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    color: 'purple',
    tasks: [
      {
        id: 'PROJ-006',
        title: 'Performance optimization',
        icon: '⚡',
        status: 'todo',
        progress: 0,
        startDate: '2024-02-01',
        endDate: '2024-02-10',
        color: 'blue',
        checked: false,
      },
      {
        id: 'PROJ-007',
        title: 'Add new integrations',
        icon: '🔌',
        status: 'todo',
        progress: 0,
        startDate: '2024-02-08',
        endDate: '2024-02-18',
        color: 'green',
        checked: false,
      },
      {
        id: 'PROJ-008',
        title: 'Bug fixes and polish',
        icon: '🐛',
        status: 'todo',
        progress: 0,
        startDate: '2024-02-15',
        endDate: '2024-02-25',
        color: 'orange',
        checked: false,
      },
    ],
  },
  {
    id: 'v2.0',
    title: 'Version 2.0',
    icon: '🎯',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    color: 'green',
    collapsed: true,
    tasks: [
      {
        id: 'PROJ-009',
        title: 'Major refactor',
        icon: '🔄',
        status: 'todo',
        startDate: '2024-03-01',
        endDate: '2024-03-15',
        color: 'purple',
        checked: false,
      },
      {
        id: 'PROJ-010',
        title: 'New feature set',
        icon: '✨',
        status: 'todo',
        startDate: '2024-03-10',
        endDate: '2024-03-28',
        color: 'blue',
        checked: false,
      },
    ],
  },
];

export const DefaultGantt = () => {
  return (
    <Gantt
      milestones={sampleMilestones}
      today="2024-01-15"
      initialView="day"
      height={500}
      onTaskClick={(task, milestone) => {
        console.log('Task clicked:', task.id, task.title, 'in', milestone.title);
      }}
      onTaskCheck={(task, checked, milestone) => {
        console.log('Task checked:', task.id, checked, 'in', milestone.title);
      }}
      onMilestoneClick={(milestone) => {
        console.log('Milestone clicked:', milestone.title);
      }}
      onMilestoneToggle={(milestone, collapsed) => {
        console.log('Milestone toggled:', milestone.title, collapsed);
      }}
      onViewChange={(view) => {
        console.log('View changed:', view);
      }}
    />
  );
};

export default DefaultGantt;
