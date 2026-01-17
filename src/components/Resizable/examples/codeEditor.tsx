import React from 'react';
import { Resizable } from '../Resizable';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const CodeEditorLayout = () => {
  return (
    <View
      height="600px"
      width="100%"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Resizable>
        {/* File Explorer */}
        <Resizable.Panel
          id="explorer"
          defaultSize="20%"
          minSize={150}
          maxSize={300}
        >
          <View padding="8px" height="100%" backgroundColor="color-gray-100">
            <Text fontWeight="bold" marginBottom="8px">
              Explorer
            </Text>
            <Vertical gap={4}>
              <View
                padding="4px 8px"
                borderRadius="4px"
                backgroundColor="color-blue-100"
              >
                <Text>src/</Text>
              </View>
              <View padding="4px 8px" marginLeft="12px" borderRadius="4px">
                <Text>components/</Text>
              </View>
              <View
                padding="4px 8px"
                marginLeft="24px"
                borderRadius="4px"
                backgroundColor="color-blue-100"
              >
                <Text>Resizable/</Text>
              </View>
              <View padding="4px 8px" marginLeft="36px" borderRadius="4px">
                <Text>Resizable.tsx</Text>
              </View>
              <View padding="4px 8px" marginLeft="36px" borderRadius="4px">
                <Text>Resizable.props.ts</Text>
              </View>
              <View padding="4px 8px" marginLeft="36px" borderRadius="4px">
                <Text>Resizable.view.tsx</Text>
              </View>
            </Vertical>
          </View>
        </Resizable.Panel>

        <Resizable.Handle id="handle1" withVisualIndicator />

        {/* Main Editor Area */}
        <Resizable.Panel id="editor" defaultSize="60%">
          <Resizable orientation="vertical">
            {/* Code Editor */}
            <Resizable.Panel id="code" defaultSize="70%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-900"
                color="white"
                fontFamily="monospace"
              >
                <Text
                  fontWeight="bold"
                  marginBottom="8px"
                  color="color-gray-300"
                >
                  Resizable.tsx
                </Text>
                <Text color="color-blue-300">import</Text>
                <Text color="white"> React </Text>
                <Text color="color-blue-300">from</Text>
                <Text color="color-green-300"> react</Text>
                <Text color="white">;</Text>
                <Text></Text>
                <Text color="color-blue-300">import</Text>
                <Text color="white"> {'{'} </Text>
                <Text color="white">ResizableProps,</Text>
                <Text color="white">ResizableType,</Text>
                <Text color="white">{'}'} </Text>
                <Text color="color-blue-300">from</Text>
                <Text color="color-green-300"> </Text>
                <Text color="white">;</Text>
                <Text></Text>
                <Text color="color-purple-300">const</Text>
                <Text color="color-yellow-300"> ResizableComponent</Text>
                <Text color="white">: React.FC</Text>
                <Text color="color-gray-300">{'<'}</Text>
                <Text color="color-yellow-300">ResizableProps</Text>
                <Text color="color-gray-300">{'>'}</Text>
                <Text color="white">{'}'}</Text>
              </View>
            </Resizable.Panel>

            <Resizable.Handle id="handle2" withVisualIndicator />

            {/* Terminal */}
            <Resizable.Panel id="terminal" defaultSize="30%">
              <View
                padding="16px"
                height="100%"
                backgroundColor="color-gray-800"
                color="white"
                fontFamily="monospace"
              >
                <Text
                  fontWeight="bold"
                  marginBottom="8px"
                  color="color-gray-300"
                >
                  Terminal
                </Text>
                <Text color="color-green-300">$ </Text>
                <Text color="white">npm run build</Text>
                <Text color="color-blue-300">Building project...</Text>
                <Text color="color-green-300">
                  Build completed successfully!
                </Text>
              </View>
            </Resizable.Panel>
          </Resizable>
        </Resizable.Panel>

        <Resizable.Handle id="handle3" withVisualIndicator />

        {/* Preview/Properties */}
        <Resizable.Panel
          id="preview"
          defaultSize="20%"
          minSize={150}
          maxSize={300}
        >
          <View padding="16px" height="100%" backgroundColor="color-gray-100">
            <Text fontWeight="bold" marginBottom="8px">
              Properties
            </Text>
            <Vertical gap={8}>
              <View
                padding="8px"
                borderRadius="4px"
                backgroundColor="color-white"
              >
                <Text fontWeight="bold" color="color-gray-500">
                  COMPONENT
                </Text>
                <Text>Resizable</Text>
              </View>
              <View
                padding="8px"
                borderRadius="4px"
                backgroundColor="color-white"
              >
                <Text fontWeight="bold" color="color-gray-500">
                  ORIENTATION
                </Text>
                <Text>horizontal</Text>
              </View>
              <View
                padding="8px"
                borderRadius="4px"
                backgroundColor="color-white"
              >
                <Text fontWeight="bold" color="color-gray-500">
                  SIZE
                </Text>
                <Text>md</Text>
              </View>
              <View
                padding="8px"
                borderRadius="4px"
                backgroundColor="color-white"
              >
                <Text fontWeight="bold" color="color-gray-500">
                  VARIANT
                </Text>
                <Text>default</Text>
              </View>
            </Vertical>
          </View>
        </Resizable.Panel>
      </Resizable>
    </View>
  );
};
