import React from 'react';
import { View, Text, Vertical } from 'app-studio';
import { Gantt } from '../components/Gantt';
import { GanttTask, GanttMilestone } from '../components/Gantt/Gantt/Gantt.props';

const milestones: GanttMilestone[] = [
  {
    id: 'm1',
    title: 'Q1 Release',
    description: 'First quarter deliverables',
  },
  {
    id: 'm2',
    title: 'Q2 Planning',
    description: 'Second quarter roadmap',
  },
];

const tasks: GanttTask[] = [
  {
    id: 'TASK-1',
    title: 'Design System Implementation',
    completed: false,
    progress: 60,
    start: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
    end: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    milestoneId: 'm1',
  },
  {
    id: 'TASK-2',
    title: 'Authentication Flow',
    completed: true,
    progress: 100,
    start: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
    end: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
    milestoneId: 'm1',
  },
  {
    id: 'TASK-3',
    title: 'Database Schema Design',
    completed: false,
    progress: 30,
    start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
    end: new Date(new Date().setDate(new Date().getDate() + 8)).toISOString().split('T')[0],
    milestoneId: 'm1',
  },
  {
    id: 'TASK-4',
    title: 'API Development',
    completed: false,
    progress: 0,
    start: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    end: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString().split('T')[0],
    milestoneId: 'm2',
  },
];

const GanttPage = () => {
  return (
    <Vertical gap={24} padding={20} width="100%" height="100%">
      <View>
        <Text fontSize={24} fontWeight={600}>Gantt Chart Example</Text>
        <Text color="color.gray.600">
          A Linear-style project timeline component with grouped tasks and multiple views.
        </Text>
      </View>

      <Gantt
        tasks={tasks}
        milestones={milestones}
        height={600}
      />
    </Vertical>
  );
};

export default GanttPage;
