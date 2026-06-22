/**
 * DropZoneView (React Native)
 *
 * The web view renders a hidden `<input type="file">` plus HTML drag-and-drop
 * handlers (`onDragEnter`/`onDrop`/…) — neither exists on React Native (a raw
 * `<input>` would crash the renderer). This native view keeps the identical
 * visual surface (dashed drop area, upload icon, text, single-file preview and
 * the multi-file `AttachmentGroup`) and routes the tap through `handleClick`
 * (a safe no-op until the host wires up a native picker such as
 * `react-native-image-picker` / `expo-document-picker`).
 */

import React from 'react';
import { Text, Center, Image, View } from 'app-studio';
import { DropZoneProps, DropZoneStateProps } from './DropZone.props';
import { UploadIcon } from '../../Icon/Icon';
import { AttachmentGroup } from '../../AttachmentGroup/AttachmentGroup';

export const DropZoneView: React.FC<DropZoneProps & DropZoneStateProps> = ({
  children,
  text = 'Tap to choose a file',
  textProps,
  containerProps,
  disabled,
  isDragActive,
  handleClick,
  preview,
  imageProps,
  multiple,
  selectedFiles,
  onRemove,
}) => {
  return (
    <Center
      width="100%"
      minHeight={200}
      height={selectedFiles && selectedFiles.length > 0 ? 'auto' : 200}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={isDragActive ? 'theme-primary' : 'color-gray-300'}
      borderRadius={12}
      backgroundColor={isDragActive ? '#EFF6FF' : 'color-gray-50'}
      flexDirection="column"
      opacity={disabled ? 0.6 : 1}
      onPress={disabled ? undefined : handleClick}
      overflow="hidden"
      position="relative"
      padding={16}
      {...containerProps}
    >
      {preview && !multiple ? (
        <View width="100%" height={200} position="relative">
          <Image
            src={preview}
            alt="Preview"
            width="100%"
            height="100%"
            objectFit="contain"
            {...imageProps}
          />
        </View>
      ) : (
        <View flexDirection="column" alignItems="center" width="100%">
          {children ? (
            children
          ) : (
            <View flexDirection="column" alignItems="center" width="100%">
              <UploadIcon
                widthHeight={40}
                color={isDragActive ? 'theme-primary' : 'color-gray-500'}
              />
              <Text
                marginTop={16}
                color={isDragActive ? 'theme-primary' : 'color-gray-600'}
                fontWeight={500}
                textAlign="center"
                {...textProps}
              >
                {text}
              </Text>
            </View>
          )}
          {multiple && selectedFiles && selectedFiles.length > 0 && (
            <View marginTop={16} width="100%">
              <AttachmentGroup
                files={selectedFiles}
                onRemove={onRemove || (() => {})}
                showPreviews
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
