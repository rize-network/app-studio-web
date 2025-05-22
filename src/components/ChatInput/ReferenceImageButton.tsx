'use client';

import React from 'react';
import { Text, View } from 'app-studio';
import { ImageIcon } from '../Icon/Icon';

interface ReferenceImageButtonProps {
  onClick: () => void;
  views?: {
    button?: any;
    text?: any;
    icon?: any;
  };
}

export const ReferenceImageButton: React.FC<ReferenceImageButtonProps> = ({
  onClick,
  views = {},
}) => {
  // Using theme context for potential future styling

  return (
    <View
      as="button"
      type="button"
      display="flex"
      alignItems="center"
      gap={4}
      padding="6px 10px"
      border="1px solid"
      borderColor="color.gray.300"
      borderRadius="4px"
      backgroundColor="transparent"
      cursor="pointer"
      transition="all 0.2s ease"
      onClick={onClick}
      _hover={{
        backgroundColor: 'color.gray.100',
      }}
      {...views?.button}
    >
      <Text fontSize="14px" color="color.gray.700" {...views?.text}>
        Reference image
      </Text>

      <ImageIcon
        widthHeight={20}
        color="currentColor"
        filled={false}
        strokeWidth={2}
        {...views?.icon}
      />
    </View>
  );
};
