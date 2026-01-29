import React from 'react';
import { Text, Center, Image, View } from 'app-studio';
import { DropZoneProps, DropZoneStateProps } from './DropZone.props';
import { UploadIcon } from '../../Icon/Icon';
import { AttachmentGroup } from '../../AttachmentGroup/AttachmentGroup';

export const DropZoneView: React.FC<DropZoneProps & DropZoneStateProps> = ({
  children,
  text = 'Drop files here or click to upload',
  textProps,
  containerProps,
  disabled,
  accept,
  multiple,
  isDragActive,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleClick,
  handleFileChange,
  inputRef,
  preview,
  imageProps,
  selectedFiles,
  onRemove,
}) => {
  return (
    <Center
      width="100%"
      minHeight="200px" // changed to minHeight to accommodate content
      height={selectedFiles && selectedFiles.length > 0 ? 'auto' : '200px'}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={isDragActive ? 'primary' : 'rgba(0,0,0,0.1)'}
      borderRadius={12}
      backgroundColor={isDragActive ? 'rgba(0,0,0,0.02)' : 'transparent'}
      flexDirection="column"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.6 : 1}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      transition="all 0.2s ease-in-out"
      overflow="hidden"
      position="relative"
      padding={16}
      {...containerProps}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {/* Single File Image Preview */}
      {preview && !multiple ? (
        <View width="100%" height="200px" position="relative">
          <Image
            src={preview}
            alt="Preview"
            width="100%"
            height="100%"
            objectFit="contain"
            {...imageProps}
          />
          {/* Overlay */}
          <Center
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0,0,0,0.3)"
            opacity={0}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
          >
            <Text color="white" fontWeight={600}>
              Click to replace
            </Text>
          </Center>
        </View>
      ) : (
        <View flexDirection="column" alignItems="center" width="100%">
          {children ? (
            children
          ) : (
            <View flexDirection="column" alignItems="center" width="100%">
              <UploadIcon
                widthHeight={40}
                color={isDragActive ? 'primary' : 'rgba(0,0,0,0.4)'}
              />
              <Text
                marginTop={16}
                color={isDragActive ? 'primary' : 'rgba(0,0,0,0.6)'}
                fontWeight={500}
                textAlign="center"
                {...textProps}
              >
                {text}
              </Text>
            </View>
          )}

          {/* Multiple Files Preview using AttachmentGroup */}
          {multiple && selectedFiles && selectedFiles.length > 0 && (
            <View marginTop={16} width="100%">
              <AttachmentGroup
                files={selectedFiles}
                onRemove={onRemove || (() => {})}
                showPreviews={true}
                layout="inline"
                maxHeight="160px"
              />
            </View>
          )}
        </View>
      )}
    </Center>
  );
};
