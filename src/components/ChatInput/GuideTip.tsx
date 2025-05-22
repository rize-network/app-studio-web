'use client';

import React from 'react';
import { Text, View } from 'app-studio';
import { CloseIcon } from '../Icon/Icon';

interface GuideTipProps {
  videoUrl?: string;
  onClose: () => void;
  views?: {
    container?: any;
    video?: any;
    closeButton?: any;
  };
}

export const GuideTip: React.FC<GuideTipProps> = ({
  videoUrl,
  onClose,
  views = {},
}) => {
  // Using theme context for potential future styling

  return (
    <View
      position="relative"
      width="100%"
      padding="16px"
      backgroundColor="color.blue.50"
      borderRadius="8px"
      marginBottom="16px"
      animate={{
        from: { opacity: 0, transform: 'translateX(-20px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      }}
      animationDuration={0.3}
      {...views?.container}
    >
      <Text fontSize="14px" color="color.blue.700" marginBottom="8px">
        Need help? Watch this quick guide to get started.
      </Text>

      {videoUrl && (
        <View
          as="video"
          src={videoUrl}
          controls
          width="100%"
          height="auto"
          borderRadius="4px"
          {...views?.video}
        />
      )}

      <View
        as="button"
        type="button"
        position="absolute"
        top="8px"
        right="8px"
        width="24px"
        height="24px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        backgroundColor="transparent"
        border="none"
        cursor="pointer"
        transition="all 0.2s ease"
        onClick={onClose}
        _hover={{
          backgroundColor: 'color.blue.100',
        }}
        {...views?.closeButton}
      >
        <CloseIcon
          widthHeight={16}
          color="currentColor"
          filled={false}
          strokeWidth={2}
        />
      </View>
    </View>
  );
};
