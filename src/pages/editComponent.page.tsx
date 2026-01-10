import React, { useState } from 'react';
import { View, Text, Vertical, Horizontal } from 'app-studio';
import { EditComponent } from '../components/EditComponent';

export const EditComponentPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null
  );

  const handleSelect = (id: string, element: HTMLElement) => {
    setSelectedId(id);
    setSelectedElement(element);
  };

  const handleClose = () => {
    setSelectedId(null);
    setSelectedElement(null);
  };

  const renderSelectable = (
    id: string,
    label: string,
    color: string,
    extraLabel?: string
  ) => {
    const isSelected = selectedId === id;
    return (
      <View
        id={id}
        width="240px"
        height="160px"
        backgroundColor={color}
        borderRadius="12px"
        padding="24px"
        position="relative"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          handleSelect(id, e.currentTarget as HTMLElement);
        }}
        border={isSelected ? '3px solid #000' : '3px solid transparent'}
        boxShadow={isSelected ? '0 4px 20px rgba(0,0,0,0.15)' : 'none'}
        cursor="pointer"
        transition="all 0.2s"
      >
        <Text fontWeight="bold" color="white" fontSize="20px">
          {label}
        </Text>
        <Text color="white" opacity={0.9} marginTop="8px" fontSize="14px">
          {extraLabel || 'Click to Edit'}
        </Text>
      </View>
    );
  };

  // Define custom toolbars for specific examples
  const actionTools = [
    { id: 'save', icon: 'save', actionOnly: true },
    { id: 'duplicate', icon: 'copy', actionOnly: true },
    { id: 'info', icon: 'info', actionOnly: true },
    { id: 'delete', icon: 'trash', special: true, actionOnly: true },
  ];

  const mediaTools = [
    { id: 'replace', icon: 'refresh-cw', actionOnly: true },
    { id: 'crop', icon: 'crop' },
    { id: 'filter', icon: 'sliders' },
    { id: 'download', icon: 'download', special: true, actionOnly: true },
  ];

  // Logic to determine props based on selected ID
  const getComponentProps = (id: string) => {
    switch (id) {
      // FLOATING EXAMPLES
      case 'float-std':
        return { variant: 'floating' as const };
      case 'float-action':
        return { variant: 'floating' as const, items: actionTools };
      case 'float-top':
        return { variant: 'floating' as const, side: 'top' as const };
      case 'float-bottom':
        return { variant: 'floating' as const, side: 'bottom' as const };

      // OVERLAY EXAMPLES
      case 'overlay-std':
        return { variant: 'overlay' as const };
      case 'overlay-media':
        return { variant: 'overlay' as const, items: mediaTools };
      case 'overlay-minimal':
        return {
          variant: 'overlay' as const,
          items: [actionTools[0], actionTools[3]],
        };

      default:
        return {};
    }
  };

  return (
    <Vertical
      width="100%"
      minHeight="100vh"
      backgroundColor="#F8FAFC"
      padding="60px"
      onClick={handleClose}
      gap={60}
      paddingBottom="120px"
    >
      <Vertical gap={16}>
        <Text fontSize="48px" fontWeight="800" letterSpacing="-1px">
          EditComponent Configuration
        </Text>
        <Text color="#64748B" fontSize="20px">
          Explore different modes and configurations. Click any element to see
          the behavior.
        </Text>
      </Vertical>

      {/* SECTION 1: FLOATING */}
      <Vertical gap={24}>
        <Text fontSize="24px" fontWeight="bold" color="#334155">
          1. Floating Context (Default)
        </Text>
        <Horizontal gap={40} flexWrap="wrap" alignItems="flex-start">
          {renderSelectable(
            'float-std',
            'Standard Text',
            '#3B82F6',
            'Opens "Fonts" by default'
          )}
          {renderSelectable(
            'float-action',
            'Action Buttons',
            '#10B981',
            'Custom icons, No form by default'
          )}
          {renderSelectable(
            'float-top',
            'Outside Top',
            '#F59E0B',
            'Horizontal toolbar above element'
          )}
          {renderSelectable(
            'float-bottom',
            'Outside Bottom',
            '#6366F1',
            'Horizontal toolbar below element'
          )}
        </Horizontal>
      </Vertical>

      {/* SECTION 2: OVERLAY */}
      <Vertical gap={24}>
        <Text fontSize="24px" fontWeight="bold" color="#334155">
          2. Overlay Context (Inside)
        </Text>
        <Horizontal gap={40} flexWrap="wrap" alignItems="flex-start">
          {renderSelectable(
            'overlay-std',
            'Standard Overlay',
            '#8B5CF6',
            'Default tools, Horizontal layout'
          )}
          {renderSelectable(
            'overlay-media',
            'Media Editor',
            '#EF4444',
            'Custom media tools, opens "Crop"'
          )}
          {renderSelectable(
            'overlay-minimal',
            'Minimal (No Form)',
            '#EC4899',
            'Save/Delete icons only'
          )}
        </Horizontal>
      </Vertical>

      {/* Render at root level */}
      {selectedElement && selectedId && (
        <EditComponent
          targetElement={selectedElement}
          onClose={handleClose}
          // Determine props dynamically based on the ID selected
          {...getComponentProps(selectedId)}
          onToolAction={(toolId) => {
            alert(`Callback triggered for tool: ${toolId}`);
          }}
        />
      )}
    </Vertical>
  );
};

export default EditComponentPage;
