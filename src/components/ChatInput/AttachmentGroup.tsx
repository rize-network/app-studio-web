'use client';

import React from 'react';
import { Horizontal, Text, View, useTheme } from 'app-studio';
import { UploadedFile } from './ChatInput/ChatInput.type';
import { ImageIcon, TrashIcon } from '../Icon/Icon';
import { Button } from '../Button/Button';

interface AttachmentGroupProps {
  files: UploadedFile[];
  sandboxId?: string;
  onRemove: (index: number) => void;
  onSetAsReference?: (index: number) => void;
  layout?: 'inline' | 'grid';
  maxHeight?: string;
  showPreviews?: boolean;
  views?: {
    container?: any;
    item?: any;
    name?: any;
    size?: any;
    removeButton?: any;
    referenceButton?: any;
  };
}

export const AttachmentGroup: React.FC<AttachmentGroupProps> = ({
  files,
  sandboxId,
  onRemove,
  onSetAsReference,
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
              <Text as="span" marginLeft="4px" color="theme.primary">
                (pending)
              </Text>
            )}
          </Text>

          {showPreviews && file.type.startsWith('audio/') && (
            <audio
              controls
              src={file.localUrl || file.path}
              style={{ maxWidth: '200px' }}
            />
          )}

          {/* Reference button for image files */}
          {onSetAsReference && file.type.startsWith('image/') && (
            <View
              as="button"
              type="button"
              width="16px"
              height="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              backgroundColor={
                file.isReferenceImage ? 'theme.primary' : 'transparent'
              }
              color={file.isReferenceImage ? 'color.white' : 'color.gray.500'}
              cursor="pointer"
              transition="all 0.2s ease"
              onClick={() => onSetAsReference(index)}
              title={
                file.isReferenceImage
                  ? 'Reference image'
                  : 'Set as reference image'
              }
              _hover={{
                backgroundColor: file.isReferenceImage
                  ? 'color.blue.600'
                  : 'color.blue.100',
                color: file.isReferenceImage ? 'color.white' : 'theme.primary',
              }}
              {...views?.referenceButton}
            >
              <ImageIcon
                widthHeight={20}
                color="currentColor"
                filled={file.isReferenceImage}
              />
            </View>
          )}

          <Button
            variant="ghost"
            size="sm"
            icon={<TrashIcon widthHeight={12} />}
            onClick={() => onRemove(index)}
          />
        </Horizontal>
      ))}
    </View>
  );
};
