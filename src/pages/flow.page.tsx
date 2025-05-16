import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import { DefaultFlow, FlowchartExample } from '../components/Flow/examples';
import { FlowList } from '../components/Flow/examples/list';

const FlowPage = () => {
  return (
    <View padding={20}>
      <Vertical gap={40} width="100%" maxWidth={1200} margin="0 auto">
        <Text fontWeight="bold">Workflow Builder Components</Text>

        <Vertical gap={20}>
          <Text fontWeight="bold">Workflow Tree</Text>
          <FlowList />
        </Vertical>

        <Vertical gap={20}>
          <Text fontWeight="bold">Flow Component</Text>
          <DefaultFlow />
        </Vertical>

        <Vertical gap={20}>
          <Text fontSize="2xl" fontWeight="bold">
            Flowchart Component
          </Text>
          <Text>
            This page demonstrates a flowchart component that can be used to
            create diagrams like the one below. The flowchart supports zooming,
            panning, and adding nodes in different directions.
          </Text>
          <FlowchartExample />
        </Vertical>
      </Vertical>
    </View>
  );
};

export default FlowPage;
