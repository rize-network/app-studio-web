'use client';

import React from 'react';
import { Text, View } from 'app-studio';
import { CloseIcon } from '../Icon/Icon';

interface ReferenceImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  views?: {
    container?: any;
    content?: any;
    closeButton?: any;
  };
}

export const ReferenceImageModal: React.FC<ReferenceImageModalProps> = ({
  isOpen,
  onClose,
  views = {},
}) => {
  // Using theme context for potential future styling

  if (!isOpen) {
    return null;
  }

  return (
    <View
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height={isOpen ? '300px' : '0'}
      backgroundColor="color.white"
      borderRadius="8px"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
      transition="height 0.3s ease"
      zIndex="10"
      {...views?.container}
    >
      <View padding="16px" width="100%" height="100%" {...views?.content}>
        <Text fontSize="16px" fontWeight="600" marginBottom="16px">
          Reference Image
        </Text>

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
            backgroundColor: 'color.gray.100',
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

        {/* Reference image content goes here */}
        <View
          width="100%"
          height="calc(100% - 40px)"
          backgroundColor="color.gray.100"
          borderRadius="4px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="color.gray.500">
            Drop an image here or click to upload
          </Text>
        </View>
      </View>
    </View>
  );
};
