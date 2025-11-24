import React from 'react';
import { Gantt, GanttMilestone } from '../Gantt';

const simpleMilestones: GanttMilestone[] = [
  {
    id: 'sprint-1',
    title: 'Sprint 1',
    icon: '📌',
    tasks: [
      {
        id: 'T-1',
        title: 'User authentication',
        startDate: '2024-01-08',
        endDate: '2024-01-12',
        color: 'blue',
      },
      {
        id: 'T-2',
        title: 'Dashboard layout',
        startDate: '2024-01-10',
        endDate: '2024-01-15',
        color: 'green',
      },
      {
        id: 'T-3',
        title: 'API integration',
        startDate: '2024-01-15',
        endDate: '2024-01-19',
        color: 'purple',
      },
    ],
  },
  {
    id: 'sprint-2',
    title: 'Sprint 2',
    icon: '📌',
    tasks: [
      {
        id: 'T-4',
        title: 'Data visualization',
        startDate: '2024-01-22',
        endDate: '2024-01-26',
        color: 'orange',
      },
      {
        id: 'T-5',
        title: 'Export functionality',
        startDate: '2024-01-24',
        endDate: '2024-01-31',
        color: 'red',
      },
    ],
  },
];

export const SimpleGantt = () => {
  return (
    <Gantt
      milestones={simpleMilestones}
      today="2024-01-15"
      initialView="week"
      height={400}
      showProgress={false}
      showCheckboxes={false}
    />
  );
};

export default SimpleGantt;
