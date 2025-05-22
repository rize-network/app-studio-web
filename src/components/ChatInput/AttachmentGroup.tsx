'use client';

import React from 'react';
import { Horizontal, Text, View, useTheme } from 'app-studio';
import { UploadedFile } from './ChatInput/ChatInput.type';

interface AttachmentGroupProps {
  files: UploadedFile[];
  sandboxId?: string;
  onRemove: (index: number) => void;
  layout?: 'inline' | 'grid';
  maxHeight?: string;
  showPreviews?: boolean;
  views?: {
    container?: any;
    item?: any;
    name?: any;
    size?: any;
    removeButton?: any;
  };
}

export const AttachmentGroup: React.FC<AttachmentGroupProps> = ({
  files,
  sandboxId,
  onRemove,
  layout = 'inline',
  maxHeight = '120px',
  showPreviews = false,
  views = {},
}) => {
  const { getColor } = useTheme();
  
  if (files.length === 0) {
    return null;
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <View
      display="flex"
      flexWrap="wrap"
      gap="6px"
      padding="8px 0"
      maxHeight={maxHeight}
      overflowY="auto"
      {...views?.container}
    >
      {files.map((file, index) => (
        <Horizontal
          key={index}
          alignItems="center"
          gap="6px"
          padding="4px 8px"
          borderRadius="6px"
          backgroundColor="color.gray.100"
          animate={{
            from: { opacity: 0, scale: 0.9 },
            to: { opacity: 1, scale: 1 },
          }}
          animationDuration={0.2}
          {...views?.item}
        >
          <Text
            fontSize="12px"
            fontWeight="500"
            color="color.gray.700"
            maxWidth="120px"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            {...views?.name}
          >
            {file.name}
          </Text>
          
          <Text
            fontSize="10px"
            color="color.gray.500"
            flexShrink={0}
            {...views?.size}
          >
            ({formatFileSize(file.size)})
            {!sandboxId && (
              <Text
                as="span"
                marginLeft="4px"
                color="theme.primary"
              >
                (pending)
              </Text>
            )}
          </Text>
          
          <View
            as="button"
            type="button"
            width="16px"
            height="16px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            backgroundColor="transparent"
            color="color.gray.500"
            cursor="pointer"
            transition="all 0.2s ease"
            onClick={() => onRemove(index)}
            _hover={{
              backgroundColor: "color.gray.200",
              color: "color.gray.700"
            }}
            {...views?.removeButton}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </View>
        </Horizontal>
      ))}
    </View>
  );
};
