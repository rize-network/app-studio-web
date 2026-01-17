import React from 'react';
import { Vertical, Horizontal, Text, Button, View } from 'app-studio';
import { Icon } from '../Icon/Icon';
// We'll assume Select is available in app-studio or we mock it.
// Since I can't verify 'app-studio' exports easily without package inspection (which I did but 'main' helps),
// I will create a simple mock Select for the purpose of this visual component if the real one is complex or missing.
// However, seeing DefaultSelect uses it simply, I'll try to use a mock to be safe and perfectly match the visual style of the image.

const MockSelect = ({ label, value, options }: any) => (
  <View>
    <Horizontal
      justifyContent="space-between"
      width="100%"
      padding="8px"
      border="1px solid #E2E8F0"
      borderRadius="6px"
      alignItems="center"
      backgroundColor="white"
    >
      <Text>{value || options[0]?.label}</Text>
      <Icon name="chevron-down" size={16} />
    </Horizontal>
  </View>
);

interface EditPanelProps {
  onClose?: () => void;
  activeToolId?: string;
}

export const EditPanel: React.FC<EditPanelProps> = ({
  onClose,
  activeToolId,
}) => {
  // Only show if we have an active tool
  if (!activeToolId) return null;

  // For this demo, we only really implement the "text" (Fonts) tool panel as per image.
  // But we show a header for others.

  const renderFontsForm = () => (
    <Vertical gap={16}>
      <Vertical gap={8}>
        <Text fontSize="12px" color="color-gray-500" fontWeight="600">
          TITLE
        </Text>
        <MockSelect
          value="Roboto"
          options={[{ label: 'Roboto', value: 'Roboto' }]}
        />
        <MockSelect value="Bold" options={[{ label: 'Bold', value: 'Bold' }]} />
      </Vertical>

      <Vertical gap={8}>
        <Text fontSize="12px" color="color-gray-500" fontWeight="600">
          LABEL
        </Text>
        <MockSelect
          value="Roboto"
          options={[{ label: 'Roboto', value: 'Roboto' }]}
        />
        <MockSelect
          value="Regular"
          options={[{ label: 'Regular', value: 'Regular' }]}
        />
      </Vertical>

      <Vertical gap={8}>
        <Text fontSize="12px" color="color-gray-500" fontWeight="600">
          DESCRIPTION
        </Text>
        <MockSelect
          value="Roboto"
          options={[{ label: 'Roboto', value: 'Roboto' }]}
        />
        <MockSelect
          value="Regular"
          options={[{ label: 'Regular', value: 'Regular' }]}
        />
      </Vertical>

      <Vertical gap={12} alignItems="center" marginTop="24px">
        <Text fontSize="14px" textAlign="center">
          Use these fonts every time?
        </Text>
        <Button variant="outline" leftIcon={<Icon name="wand" size={16} />}>
          Brand Studio
        </Button>
      </Vertical>
    </Vertical>
  );

  return (
    <Vertical
      width="280px"
      backgroundColor="white"
      borderRadius="12px"
      padding="16px"
      boxShadow="0px 4px 12px rgba(0,0,0,0.1)"
      height="fit-content"
    >
      {/* Header */}
      <Horizontal alignItems="center" gap={8} marginBottom="16px">
        <View onClick={onClose} cursor="pointer">
          <Icon name="chevron-left" size={20} />
        </View>
        <Text fontWeight="bold" fontSize="18px">
          {activeToolId === 'text'
            ? 'Fonts'
            : activeToolId.charAt(0).toUpperCase() + activeToolId.slice(1)}
        </Text>
      </Horizontal>

      {/* Content */}
      {activeToolId === 'text' ? (
        renderFontsForm()
      ) : (
        <Text>Settings for {activeToolId}</Text>
      )}
    </Vertical>
  );
};
