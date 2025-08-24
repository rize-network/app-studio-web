import React from 'react';
import { View, Vertical, Horizontal, Text } from 'app-studio';
import { Loader } from '../../../Loader/Loader';
import { AgentMessage } from './AgentChat.props';
import { DefaultAgentChatStyles } from './AgentChat.style';

interface AgentRunProgressProps {
  messages: AgentMessage[];
  isTyping: boolean;
}

/**
 * Displays a step-by-step view of the agent's reasoning and execution
 */
export const AgentRunProgress: React.FC<AgentRunProgressProps> = ({
  messages,
  isTyping,
}) => {
  const steps = messages
    .filter(
      (m) =>
        m.thought ||
        m.functionCall ||
        m.functionResponse ||
        m.executableCode ||
        m.codeExecutionResult
    )
    .map((m) => {
      if (m.thought) {
        return { id: m.id, label: m.text || 'Thinking', done: true };
      }
      if (m.functionCall) {
        return {
          id: m.id,
          label: `Call ${m.functionCall.name}`,
          done: true,
        };
      }
      if (m.functionResponse) {
        return {
          id: m.id,
          label: `Response ${m.functionResponse.name}`,
          done: true,
        };
      }
      if (m.executableCode) {
        return { id: m.id, label: 'Execute code', done: true };
      }
      if (m.codeExecutionResult) {
        return { id: m.id, label: 'Execution result', done: true };
      }
      return null;
    })
    .filter(Boolean) as { id: string; label: string; done: boolean }[];

  if (isTyping) {
    steps.push({ id: 'typing', label: 'Thinking...', done: false });
  }

  if (steps.length === 0) return null;

  return (
    <View {...DefaultAgentChatStyles.runProgress}>
      <Vertical gap={4}>
        {steps.map((step) => (
          <Horizontal key={step.id} alignItems="center" gap={8}>
            {step.done ? (
              <Text color="color.green.600">✔</Text>
            ) : (
              <Loader size="xs" />
            )}
            <Text fontSize="sm" color="color.gray.700">
              {step.label}
            </Text>
          </Horizontal>
        ))}
      </Vertical>
    </View>
  );
};

export default AgentRunProgress;
