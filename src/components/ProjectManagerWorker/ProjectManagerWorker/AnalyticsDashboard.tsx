import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import {
  ProjectAnalytics,
  ProjectManagerWorkerViewProps,
} from './ProjectManagerWorker.props';
import { TYPOGRAPHY } from './ProjectManagerWorker.style';

interface AnalyticsDashboardProps {
  analytics: ProjectAnalytics;
  views?: ProjectManagerWorkerViewProps;
}

/**
 * AnalyticsDashboard Component
 * Displays project analytics and metrics
 */
export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  analytics,
  views = {},
}) => {
  const {
    totalTasks,
    tasksByStatus,
    tasksByPriority,
    agentVsHuman,
    completionRate,
    averageCompletionTime,
    velocity,
  } = analytics;

  return (
    <Vertical {...views.analytics} gap={16} marginBottom={20}>
      <Text style={TYPOGRAPHY.subtitle}>📊 Project Analytics</Text>

      {/* Key Metrics */}
      <Horizontal gap={12} flexWrap="wrap">
        <MetricCard
          label="Total Tasks"
          value={totalTasks.toString()}
          icon="📋"
          color="color.blue.500"
        />
        <MetricCard
          label="Completion Rate"
          value={`${completionRate.toFixed(1)}%`}
          icon="✅"
          color="color.green.500"
        />
        <MetricCard
          label="Velocity"
          value={`${velocity} tasks/week`}
          icon="⚡"
          color="color.yellow.500"
        />
        <MetricCard
          label="Avg. Completion"
          value={`${averageCompletionTime.toFixed(1)}h`}
          icon="⏱️"
          color="color.purple.500"
        />
      </Horizontal>

      {/* Status Distribution */}
      <View>
        <Text
          style={TYPOGRAPHY.label}
          color="color.gray.600"
          marginBottom={8}
        >
          Status Distribution
        </Text>
        <Horizontal gap={8} flexWrap="wrap">
          <StatPill
            label="Draft"
            value={tasksByStatus.draft}
            color="color.gray.500"
          />
          <StatPill
            label="To Do"
            value={tasksByStatus.todo}
            color="color.blue.500"
          />
          <StatPill
            label="In Progress"
            value={tasksByStatus.in_progress}
            color="color.yellow.500"
          />
          <StatPill
            label="To Review"
            value={tasksByStatus.to_review}
            color="color.purple.500"
          />
          <StatPill
            label="Done"
            value={tasksByStatus.done}
            color="color.green.500"
          />
        </Horizontal>
      </View>

      {/* Agent vs Human */}
      <View>
        <Text
          style={TYPOGRAPHY.label}
          color="color.gray.600"
          marginBottom={8}
        >
          Task Assignment
        </Text>
        <Horizontal gap={8}>
          <StatPill
            label="🤖 Agent"
            value={agentVsHuman.agent}
            color="color.purple.500"
          />
          <StatPill
            label="👤 Human"
            value={agentVsHuman.human}
            color="color.blue.500"
          />
          <StatPill
            label="❓ Unassigned"
            value={agentVsHuman.unassigned}
            color="color.gray.500"
          />
        </Horizontal>
      </View>

      {/* Priority Distribution */}
      <View>
        <Text
          style={TYPOGRAPHY.label}
          color="color.gray.600"
          marginBottom={8}
        >
          Priority Distribution
        </Text>
        <Horizontal gap={8}>
          <StatPill
            label="Critical"
            value={tasksByPriority.critical}
            color="color.red.500"
          />
          <StatPill
            label="High"
            value={tasksByPriority.high}
            color="color.orange.500"
          />
          <StatPill
            label="Medium"
            value={tasksByPriority.medium}
            color="color.yellow.500"
          />
          <StatPill
            label="Low"
            value={tasksByPriority.low}
            color="color.green.500"
          />
        </Horizontal>
      </View>
    </Vertical>
  );
};

// Helper Components

interface MetricCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  color,
}) => (
  <View
    padding="12px 16px"
    backgroundColor="color.white"
    borderRadius={8}
    border="1px solid color.gray.200"
    minWidth={120}
  >
    <Text size="lg" marginBottom={4}>
      {icon}
    </Text>
    <Text size="xl" fontWeight={700} color={color}>
      {value}
    </Text>
    <Text size="xs" color="color.gray.600" marginTop={4}>
      {label}
    </Text>
  </View>
);

interface StatPillProps {
  label: string;
  value: number;
  color: string;
}

const StatPill: React.FC<StatPillProps> = ({ label, value, color }) => (
  <View
    padding="6px 12px"
    backgroundColor="color.white"
    borderRadius={16}
    border={`2px solid ${color}`}
  >
    <Text size="sm" color={color} fontWeight={600}>
      {label}: {value}
    </Text>
  </View>
);
