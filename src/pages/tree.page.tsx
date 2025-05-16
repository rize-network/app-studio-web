import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import {
  DefaultTree,
  DataDrivenTree,
  ControlledTree,
  TreeVariants,
  CustomStyledTree,
} from '../components/Tree/examples';

const TreePage = () => {
  return (
    <View padding={20}>
      <Vertical gap={40} width="100%" maxWidth={1200} margin="0 auto">
        <Text fontSize="xl" fontWeight="bold">
          Tree Component
        </Text>

        <Vertical gap={20}>
          <Text fontSize="lg" fontWeight="bold">
            Default Tree
          </Text>
          <DefaultTree />
        </Vertical>

        <Vertical gap={20}>
          <Text fontSize="lg" fontWeight="bold">
            Data-Driven Tree
          </Text>
          <DataDrivenTree />
        </Vertical>

        <Vertical gap={20}>
          <Text fontSize="lg" fontWeight="bold">
            Controlled Tree
          </Text>
          <ControlledTree />
        </Vertical>

        <Vertical gap={20}>
          <Text fontSize="lg" fontWeight="bold">
            Tree Variants and Sizes
          </Text>
          <TreeVariants />
        </Vertical>

        <Vertical gap={20}>
          <Text fontSize="lg" fontWeight="bold">
            Custom Styled Tree
          </Text>
          <CustomStyledTree />
        </Vertical>
      </Vertical>
    </View>
  );
};

export default TreePage;
