import React from 'react';
import { Vertical, Horizontal, Text, View } from 'app-studio';
import { Portal } from '../Portal';

// On web, Portal renders its children into a detached DOM node (document.body
// by default). On React Native there is no DOM portal target, so the native
// Portal renders its children inline — overlay components (Modal/Drawer/Tooltip)
// use RN's own <Modal/> instead. This demo shows the children rendering through
// the Portal either way.
export const DefaultPortal = () => (
  <Vertical gap={10} width="100%">
    <Text color="color-gray-600">Content below is rendered via a Portal:</Text>
    <Portal>
      <Horizontal
        padding={12}
        borderRadius={10}
        backgroundColor="color-blue-50"
        borderWidth={1}
        borderStyle="solid"
        borderColor="color-blue-200"
        alignItems="center"
        gap={8}
      >
        <View
          widthHeight={10}
          borderRadius={999}
          backgroundColor="color-blue-500"
        />
        <Text color="color-blue-700" fontWeight="600">
          Rendered through &lt;Portal&gt;
        </Text>
      </Horizontal>
    </Portal>
  </Vertical>
);
