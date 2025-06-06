'use client';

import React from 'react';
import { Text, View } from 'app-studio';
import { ImageIcon } from '../Icon/Icon';

interface ReferenceImageButtonProps {
  onClick: () => void;
  hasReferenceImage?: boolean;
  views?: {
    button?: any;
    text?: any;
    icon?: any;
  };
}

export const ReferenceImageButton: React.FC<ReferenceImageButtonProps> = ({
  onClick,
  hasReferenceImage = false,
  views = {},
}) => {
  return (
    <View
      as="button"
      type="button"
      display="flex"
      alignItems="center"
      gap={4}
      padding="6px 10px"
      border="1px solid"
      borderColor={hasReferenceImage ? 'theme.primary' : 'color.gray.300'}
      borderRadius="4px"
      backgroundColor={hasReferenceImage ? 'color.blue.50' : 'transparent'}
      cursor="pointer"
      transition="all 0.2s ease"
      onClick={onClick}
      _hover={{
        backgroundColor: hasReferenceImage
          ? 'color.blue.100'
          : 'color.gray.100',
      }}
      {...views?.button}
    >
      <Text
        fontSize="14px"
        color={hasReferenceImage ? 'theme.primary' : 'color.gray.700'}
        {...views?.text}
      >
        Reference image
      </Text>

      <ImageIcon
        widthHeight={20}
        color={hasReferenceImage ? 'theme.primary' : 'currentColor'}
        filled={hasReferenceImage}
        strokeWidth={2}
        {...views?.icon}
      />
    </View>
  );
};
