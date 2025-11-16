import React from 'react';
import { View, Horizontal, Vertical, Text, Button } from 'app-studio';
import {
  Task,
  ProjectManagerWorkerViewProps,
} from './ProjectManagerWorker.props';
import {
  STATUS_METADATA,
  PRIORITY_METADATA,
  ASSIGNMENT_METADATA,
  TYPOGRAPHY,
} from './ProjectManagerWorker.style';

interface AgentBuilderPanelProps {
  task: Task;
  onClose: () => void;
  onBuildAgent: () => void;
  onAssignAgent: () => void;
  views?: ProjectManagerWorkerViewProps;
}

/**
 * AgentBuilderPanel Component
 * Shows task details and agent configuration interface
 */
export const AgentBuilderPanel: React.FC<AgentBuilderPanelProps> = ({
  task,
  onClose,
  onBuildAgent,
  onAssignAgent,
  views = {},
}) => {
  const statusMeta = STATUS_METADATA[task.status];
  const priorityMeta = PRIORITY_METADATA[task.priority];
  const assignmentMeta = ASSIGNMENT_METADATA[task.assignmentType];

  return (
    <Vertical {...views.agentBuilder} gap={16}>
      {/* Header */}
      <Horizontal justifyContent="space-between" alignItems="flex-start">
        <Text style={TYPOGRAPHY.subtitle}>Task Details</Text>
        <Button size="sm" variant="tertiary" onClick={onClose}>
          ✕
        </Button>
      </Horizontal>

      {/* Task Info */}
      <Vertical gap={12}>
        <View>
          <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
            Title
          </Text>
          <Text style={TYPOGRAPHY.body} fontWeight={600}>
            {task.title}
          </Text>
        </View>

        <View>
          <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
            Description
          </Text>
          <Text style={TYPOGRAPHY.body}>{task.description || 'No description'}</Text>
        </View>

        {/* Status & Priority */}
        <Horizontal gap={8}>
          <View flex={1}>
            <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
              Status
            </Text>
            <View
              padding="4px 8px"
              backgroundColor={statusMeta.backgroundColor}
              borderRadius={4}
            >
              <Text style={TYPOGRAPHY.caption} color={statusMeta.color}>
                {statusMeta.icon} {statusMeta.label}
              </Text>
            </View>
          </View>

          <View flex={1}>
            <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
              Priority
            </Text>
            <View
              padding="4px 8px"
              backgroundColor={priorityMeta.backgroundColor}
              borderRadius={4}
            >
              <Text style={TYPOGRAPHY.caption} color={priorityMeta.color}>
                {priorityMeta.icon} {priorityMeta.label}
              </Text>
            </View>
          </View>
        </Horizontal>

        {/* Assignment */}
        <View>
          <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
            Assignment
          </Text>
          <View
            padding="8px 12px"
            backgroundColor={assignmentMeta.backgroundColor}
            borderRadius={6}
          >
            <Text style={TYPOGRAPHY.body} color={assignmentMeta.color}>
              {assignmentMeta.icon} {assignmentMeta.label}
            </Text>
            {task.assignedTo && (
              <Text size="sm" color={assignmentMeta.color} marginTop={4}>
                Assigned to: {task.agentConfig?.name || task.assignedTo}
              </Text>
            )}
          </View>
        </View>

        {/* Skills */}
        {task.skills.length > 0 && (
          <View>
            <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
              Required Skills
            </Text>
            <Horizontal gap={6} flexWrap="wrap">
              {task.skills.map((skill) => (
                <View
                  key={skill}
                  padding="4px 10px"
                  backgroundColor="color.blue.100"
                  borderRadius={4}
                >
                  <Text size="sm" color="color.blue.700">
                    {skill}
                  </Text>
                </View>
              ))}
            </Horizontal>
          </View>
        )}

        {/* Acceptance Criteria */}
        {task.acceptanceCriteria.length > 0 && (
          <View>
            <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
              Acceptance Criteria
            </Text>
            <Vertical gap={6}>
              {task.acceptanceCriteria.map((criterion, index) => (
                <Horizontal key={index} gap={6} alignItems="flex-start">
                  <Text size="sm">✓</Text>
                  <Text size="sm" flex={1}>
                    {criterion}
                  </Text>
                </Horizontal>
              ))}
            </Vertical>
          </View>
        )}

        {/* Knowledge Sources */}
        {task.knowledgeSources.length > 0 && (
          <View>
            <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
              Knowledge Sources
            </Text>
            <Vertical gap={6}>
              {task.knowledgeSources.map((source) => (
                <View
                  key={source.id}
                  padding="8px"
                  backgroundColor="color.purple.50"
                  borderRadius={4}
                  border="1px solid color.purple.200"
                >
                  <Text size="sm" fontWeight={600} color="color.purple.900">
                    {source.name}
                  </Text>
                  <Text size="xs" color="color.purple.700" marginTop={2}>
                    {source.type} • {source.priority} priority
                  </Text>
                  <Text size="xs" color="color.gray.600" marginTop={2}>
                    {source.path}
                  </Text>
                </View>
              ))}
            </Vertical>
          </View>
        )}

        {/* Agent Configuration */}
        {task.agentConfig && (
          <View>
            <Text style={TYPOGRAPHY.label} color="color.gray.600" marginBottom={4}>
              Agent Configuration
            </Text>
            <View
              padding="12px"
              backgroundColor="color.green.50"
              borderRadius={6}
              border="1px solid color.green.200"
            >
              <Text size="sm" fontWeight={600} color="color.green.900">
                🤖 {task.agentConfig.name}
              </Text>
              <Text size="xs" color="color.green.700" marginTop={4}>
                Type: {task.agentConfig.type} • Role: {task.agentConfig.role}
              </Text>
              <Text size="xs" color="color.gray.600" marginTop={4}>
                Specialty: {task.agentConfig.specialty}
              </Text>
              <Text size="xs" color="color.gray.600" marginTop={6}>
                Capabilities: {task.agentConfig.capabilities.length} capabilities
              </Text>
              <Text size="xs" color="color.gray.600" marginTop={2}>
                Knowledge: {task.agentConfig.knowledgeSources.length} sources
              </Text>
            </View>
          </View>
        )}
      </Vertical>

      {/* Actions */}
      <Vertical gap={8} marginTop={16}>
        {task.assignmentType === 'unassigned' && (
          <>
            <Button variant="primary" onClick={onBuildAgent} fullWidth>
              🤖 Build & Assign Agent
            </Button>
            <Text size="xs" color="color.gray.600" textAlign="center">
              This will create a personalized agent using enterprise knowledge
              and the prompt templates
            </Text>
          </>
        )}

        {task.assignmentType === 'agent' && task.agentConfig && (
          <Button variant="success" onClick={onAssignAgent} fullWidth>
            ▶️ Execute Agent
          </Button>
        )}

        {task.assignmentType === 'human' && (
          <View
            padding="12px"
            backgroundColor="color.blue.50"
            borderRadius={6}
            textAlign="center"
          >
            <Text size="sm" color="color.blue.900">
              👤 This task is assigned to a team member
            </Text>
          </View>
        )}
      </Vertical>

      {/* Workflow Info */}
      <View
        padding="12px"
        backgroundColor="color.yellow.50"
        borderRadius={6}
        border="1px solid color.yellow.200"
        marginTop={8}
      >
        <Text size="xs" fontWeight={600} color="color.yellow.900" marginBottom={4}>
          ℹ️ Workflow Information
        </Text>
        <Text size="xs" color="color.yellow.800">
          • <strong>Draft → To Do:</strong> User validates the task
          <br />
          • <strong>To Do → In Progress:</strong> Agent/workflow is built
          <br />
          • <strong>To Review → Done:</strong> User reviews and approves
        </Text>
      </View>
    </Vertical>
  );
};
