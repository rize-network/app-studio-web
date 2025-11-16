import React, { useState } from 'react';
import { View, Horizontal, Vertical, Text, Button } from 'app-studio';
import {
  Task,
  TeamMember,
  ProjectManagerWorkerViewProps,
} from './ProjectManagerWorker.props';
import {
  PRIORITY_METADATA,
  ASSIGNMENT_METADATA,
  TYPOGRAPHY,
} from './ProjectManagerWorker.style';

interface TaskCardProps {
  task: Task;
  onSelect: () => void;
  onAssignAgent: () => void;
  onAssignHuman: (member: TeamMember) => void;
  teamMembers: TeamMember[];
  views?: ProjectManagerWorkerViewProps;
}

/**
 * TaskCard Component
 * Displays a task card in the Kanban board
 */
export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onSelect,
  onAssignAgent,
  onAssignHuman,
  teamMembers,
  views = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityMeta = PRIORITY_METADATA[task.priority];
  const assignmentMeta = ASSIGNMENT_METADATA[task.assignmentType];

  return (
    <Vertical
      {...views.taskCard}
      gap={8}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isHovered ? 1 : 0.95,
        cursor: 'pointer',
      }}
    >
      {/* Header: Priority & Assignment */}
      <Horizontal justifyContent="space-between" alignItems="center">
        <View
          padding="2px 8px"
          backgroundColor={priorityMeta.backgroundColor}
          borderRadius={4}
        >
          <Text style={TYPOGRAPHY.caption} color={priorityMeta.color}>
            {priorityMeta.icon} {priorityMeta.label}
          </Text>
        </View>

        <View
          padding="2px 8px"
          backgroundColor={assignmentMeta.backgroundColor}
          borderRadius={4}
        >
          <Text style={TYPOGRAPHY.caption} color={assignmentMeta.color}>
            {assignmentMeta.icon} {assignmentMeta.label}
          </Text>
        </View>
      </Horizontal>

      {/* Title */}
      <Text style={TYPOGRAPHY.body} fontWeight={600}>
        {task.title}
      </Text>

      {/* Description (truncated) */}
      {task.description && (
        <Text
          style={TYPOGRAPHY.caption}
          color="color.gray.600"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {task.description}
        </Text>
      )}

      {/* Skills */}
      {task.skills.length > 0 && (
        <Horizontal gap={4} flexWrap="wrap">
          {task.skills.slice(0, 3).map((skill) => (
            <View
              key={skill}
              padding="2px 6px"
              backgroundColor="color.blue.100"
              borderRadius={3}
            >
              <Text size="xs" color="color.blue.700">
                {skill}
              </Text>
            </View>
          ))}
          {task.skills.length > 3 && (
            <Text size="xs" color="color.gray.500">
              +{task.skills.length - 3}
            </Text>
          )}
        </Horizontal>
      )}

      {/* Metadata Footer */}
      <Horizontal justifyContent="space-between" alignItems="center" marginTop={4}>
        {/* Dependencies */}
        {task.dependencies.length > 0 && (
          <Text size="xs" color="color.gray.500">
            🔗 {task.dependencies.length} dependencies
          </Text>
        )}

        {/* Assigned To */}
        {task.assignedTo && (
          <Text size="xs" color="color.gray.600" fontWeight={500}>
            {task.assignmentType === 'agent' ? '🤖' : '👤'}{' '}
            {task.agentConfig?.name || task.assignedTo}
          </Text>
        )}
      </Horizontal>

      {/* Quick Actions (shown on hover) */}
      {isHovered && task.assignmentType === 'unassigned' && (
        <Horizontal gap={4} marginTop={4}>
          <Button size="xs" variant="primary" onClick={(e) => {
            e.stopPropagation();
            onAssignAgent();
          }}>
            🤖 Assign Agent
          </Button>
        </Horizontal>
      )}
    </Vertical>
  );
};
