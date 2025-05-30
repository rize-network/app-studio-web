'use client';

import React, { useRef } from 'react';
import { Text, View, Horizontal } from 'app-studio';
import { CloseIcon, UploadIcon, TrashIcon } from '../Icon/Icon';
import { UploadedFile } from './ChatInput/ChatInput.type';

interface ReferenceImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceImages: UploadedFile[];
  onReferenceImageUpload: (files: File[]) => void;
  onRemoveReferenceImage: () => void;
  views?: {
    container?: any;
    content?: any;
    closeButton?: any;
    uploadArea?: any;
    preview?: any;
    removeButton?: any;
  };
}

export const ReferenceImageModal: React.FC<ReferenceImageModalProps> = ({
  isOpen,
  onClose,
  referenceImages,
  onReferenceImageUpload,
  onRemoveReferenceImage,
  views = {},
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) {
    return null;
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onReferenceImageUpload(Array.from(files));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onReferenceImageUpload(files);
    }
  };

  const currentImage = referenceImages.length > 0 ? referenceImages[0] : null;

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

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          multiple={false}
        />

        {/* Reference image content */}
        {currentImage ? (
          // Preview mode
          <View
            width="100%"
            height="calc(100% - 40px)"
            position="relative"
            {...views?.preview}
          >
            <View
              width="100%"
              height="100%"
              borderRadius="4px"
              overflow="hidden"
              position="relative"
            >
              <View
                as="img"
                src={currentImage.localUrl}
                alt={currentImage.name}
                width="100%"
                height="100%"
                objectFit="contain"
                backgroundColor="color.gray.50"
              />
            </View>

            {/* Image info and remove button */}
            <Horizontal
              position="absolute"
              bottom="8px"
              left="8px"
              right="8px"
              justifyContent="space-between"
              alignItems="center"
              backgroundColor="rgba(0, 0, 0, 0.7)"
              borderRadius="4px"
              padding="8px 12px"
            >
              <View>
                <Text color="color.white" fontWeight="500">
                  {currentImage.name}
                </Text>
                <Text fontSize="10px" color="color.gray.300">
                  {(currentImage.size / (1024 * 1024)).toFixed(1)} MB
                </Text>
              </View>

              <View
                as="button"
                type="button"
                width="24px"
                height="24px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="4px"
                backgroundColor="color.red.500"
                border="none"
                cursor="pointer"
                transition="all 0.2s ease"
                onClick={onRemoveReferenceImage}
                _hover={{
                  backgroundColor: 'color.red.600',
                }}
                {...views?.removeButton}
              >
                <TrashIcon
                  widthHeight={12}
                  color="color.white"
                  filled={false}
                  strokeWidth={2}
                />
              </View>
            </Horizontal>
          </View>
        ) : (
          // Upload mode
          <View
            width="100%"
            height="calc(100% - 40px)"
            backgroundColor="color.gray.100"
            borderRadius="4px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            border="2px dashed"
            borderColor="color.gray.300"
            cursor="pointer"
            transition="all 0.2s ease"
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            _hover={{
              backgroundColor: 'color.gray.200',
              borderColor: 'color.gray.400',
            }}
            {...views?.uploadArea}
          >
            <UploadIcon
              widthHeight={32}
              color="color.gray.400"
              filled={false}
              strokeWidth={1.5}
            />
            <Text
              fontSize="14px"
              color="color.gray.600"
              fontWeight="500"
              marginTop="8px"
            >
              Drop an image here or click to upload
            </Text>
            <Text color="color.gray.500" marginTop="4px">
              Supports JPG, PNG, GIF, WebP
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
