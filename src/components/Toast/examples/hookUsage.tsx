import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Text } from '../../Text/Text';
import { useToast } from '../Toast';

export const HookUsageDemo = () => {
  // Use the hook to get toast functions
  const toast = useToast();

  const showCustomRenderToast = () => {
    toast.success('Custom Render', 'This toast uses a custom render function', {
      render: ({ id, onClose }) => (
        <Vertical
          backgroundColor="color.purple.100"
          borderColor="color.purple.300"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="8px"
          padding="12px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          width="100%"
          maxWidth="400px"
        >
          <Text size="lg" weight="bold" color="color.purple.800">
            Custom Render Toast
          </Text>
          <Text size="sm" color="color.purple.700" marginTop="4px">
            This toast is completely custom rendered!
          </Text>
          <Horizontal justifyContent="flex-end" marginTop="8px">
            <Button size="sm" onClick={onClose}>
              Dismiss
            </Button>
          </Horizontal>
        </Vertical>
      ),
    });
  };

  const showPersistentToast = () => {
    const id = toast.warning(
      'Persistent Toast',
      'This toast will not auto-dismiss. Click the button below to dismiss it.',
      {
        duration: 0, // Set to 0 to make it persistent
        action: () => toast.remove(id),
        actionText: 'Dismiss',
      }
    );
  };

  const showAnimatedToast = () => {
    toast.info('Animated Toast', 'This toast has improved animations', {
      position: 'bottom',
    });
  };

  return (
    <Vertical gap={10}>
      <Text>
        These examples demonstrate the new hook-based API and enhanced features:
      </Text>
      <Horizontal gap={10}>
        <Button onClick={showCustomRenderToast}>Custom Render</Button>
        <Button onClick={showPersistentToast}>Persistent Toast</Button>
        <Button onClick={showAnimatedToast}>Animated Toast</Button>
      </Horizontal>
    </Vertical>
  );
};
