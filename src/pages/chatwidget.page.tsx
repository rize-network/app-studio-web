import React from 'react';
import { Vertical, Text, Horizontal } from 'app-studio';
import { Title } from '../components/Title/Title';
import {
  DefaultDemo,
  VariantDemo,
  SizeDemo,
  CustomStylingDemo,
  WidgetDemo,
} from '../components/ChatWidget/examples';

export function ChatWidgetPage() {
  return (
    <Vertical
      gap={48}
      padding="48px 24px"
      maxWidth="1200px"
      margin="0 auto"
      backgroundColor="color-gray-100"
    >
      {/* Header */}
      <Vertical gap={16}>
        <Title level={1}>ChatWidget Chat Component</Title>
        <Text fontSize="18px" color="color-gray-600">
          A configurable chat interface component inspired by the ChatWidget
          toolbar design. This is a UI-only component without backend/LLM
          connections.
        </Text>
      </Vertical>

      {/* Default Example */}
      <Vertical gap={16}>
        <Title level={2}>Interactive Example</Title>
        <Text color="color-gray-600">
          Try typing a message and pressing Enter to see the component in
          action.
        </Text>
        <DefaultDemo />
      </Vertical>

      {/* Variants */}
      <Vertical gap={16}>
        <Title level={2}>Variants</Title>
        <Text color="color-gray-600">
          Choose from different visual styles: default, glassy, or minimal.
        </Text>
        <VariantDemo />
      </Vertical>

      {/* Sizes */}
      <Vertical gap={16}>
        <Title level={2}>Sizes</Title>
        <Text color="color-gray-600">
          Adjust the size to fit your design: small, medium, or large.
        </Text>
        <SizeDemo />
      </Vertical>

      {/* Widget Example */}
      <Vertical gap={16}>
        <Title level={2}>Floating Widget & Context Selector</Title>
        <Text color="color-gray-600">
          A floating chat widget that allows users to select elements from the
          DOM to reference in chat.
        </Text>
        <WidgetDemo />
      </Vertical>

      {/* Custom Styling */}
      <Vertical gap={16}>
        <Title level={2}>Custom Styling</Title>
        <Text color="color-gray-600">
          Customize colors, borders, and other styles using the styles prop.
          This example also shows file attachments.
        </Text>
        <CustomStylingDemo />
      </Vertical>

      {/* Features */}
      <Vertical gap={24} marginTop="32px">
        <Title level={2}>Features</Title>
        <Vertical gap={16}>
          <Horizontal gap={12} alignItems="flex-start">
            <Text fontSize="24px">✨</Text>
            <Vertical gap={4}>
              <Text fontWeight="600">Glassmorphic Design</Text>
              <Text color="color-gray-600">
                Beautiful glassy aesthetic with backdrop blur effects
              </Text>
            </Vertical>
          </Horizontal>

          <Horizontal gap={12} alignItems="flex-start">
            <Text fontSize="24px">💬</Text>
            <Vertical gap={4}>
              <Text fontWeight="600">Role-based Styling</Text>
              <Text color="color-gray-600">
                Distinct styling for user and assistant messages
              </Text>
            </Vertical>
          </Horizontal>

          <Horizontal gap={12} alignItems="flex-start">
            <Text fontSize="24px">🎨</Text>
            <Vertical gap={4}>
              <Text fontWeight="600">Fully Customizable</Text>
              <Text color="color-gray-600">
                Configure variants, sizes, and custom styles via props
              </Text>
            </Vertical>
          </Horizontal>

          <Horizontal gap={12} alignItems="flex-start">
            <Text fontSize="24px">📎</Text>
            <Vertical gap={4}>
              <Text fontWeight="600">Attachment Support</Text>
              <Text color="color-gray-600">
                Display file attachments with messages (visual only)
              </Text>
            </Vertical>
          </Horizontal>

          <Horizontal gap={12} alignItems="flex-start">
            <Text fontSize="24px">⌨️</Text>
            <Vertical gap={4}>
              <Text fontWeight="600">Keyboard Shortcuts</Text>
              <Text color="color-gray-600">
                Enter to send, Shift+Enter for new line
              </Text>
            </Vertical>
          </Horizontal>
        </Vertical>
      </Vertical>
    </Vertical>
  );
}

export default ChatWidgetPage;
