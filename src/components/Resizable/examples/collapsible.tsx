import React from 'react';
import { Resizable } from '../Resizable';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';

export const CollapsibleResizable = () => {
  return (
    <View
      height="400px"
      width="100%"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Resizable 
        collapsible={true} 
        autoSaveId="collapsible-example"
        keyboardResizeBy={20}
      >
        <Resizable.Panel 
          id="panel1" 
          defaultSize="25%" 
          collapsible={true}
          minSize={100}
          maxSize={300}
        >
          <View padding="16px" height="100%" backgroundColor="color.blue.50">
            <Text fontWeight="bold" marginBottom="8px">
              Collapsible Panel
            </Text>
            <Text>
              This panel can be collapsed using the button on the handle.
              It also has min (100px) and max (300px) constraints.
            </Text>
          </View>
        </Resizable.Panel>

        <Resizable.Handle 
          id="handle1" 
          withVisualIndicator 
          withCollapseButton
        />

        <Resizable.Panel id="panel2" defaultSize="50%">
          <View padding="16px" height="100%" backgroundColor="color.green.50">
            <Text fontWeight="bold" marginBottom="8px">
              Main Panel
            </Text>
            <Text>
              This is the main content panel. Try using keyboard navigation
              with arrow keys to resize panels. Home/End keys make larger jumps.
            </Text>
          </View>
        </Resizable.Panel>

        <Resizable.Handle 
          id="handle2" 
          withVisualIndicator 
          withCollapseButton
          collapseTarget="panel3"
        />

        <Resizable.Panel 
          id="panel3" 
          defaultSize="25%" 
          collapsible={true}
          defaultCollapsed={true}
        >
          <View padding="16px" height="100%" backgroundColor="color.purple.50">
            <Text fontWeight="bold" marginBottom="8px">
              Initially Collapsed Panel
            </Text>
            <Text>
              This panel starts collapsed. The layout is persisted in localStorage
              so your changes will be remembered when you return.
            </Text>
          </View>
        </Resizable.Panel>
      </Resizable>
    </View>
  );
};
