import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import { DefaultFlow } from '../components/Flow/examples';
import { WorkflowTree } from '../components/Tree/examples/workflow';

const FlowPage = () => {
  return (
    <View padding={20}>
      <Vertical gap={40} width="100%" maxWidth={1200} margin="0 auto">
        <Text fontSize="xl" fontWeight="bold">
          Workflow Builder Components
        </Text>

        <Vertical gap={20}>
          <Text fontSize="lg" fontWeight="bold">
            Workflow Tree
          </Text>
          <WorkflowTree />
        </Vertical>

        <Vertical gap={20}>
          <Text fontSize="lg" fontWeight="bold">
            Flow Component
          </Text>
          <DefaultFlow />
        </Vertical>
      </Vertical>
    </View>
  );
};

export default FlowPage;
