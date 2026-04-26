import React from 'react';
import { Text, Center, Image, View } from 'app-studio';
import { DropZoneProps, DropZoneStateProps } from './DropZone.props';
import { UploadIcon } from '../../Icon/Icon';
import { AttachmentGroup } from '../../AttachmentGroup/AttachmentGroup';
// Renders the visual representation of the DropZone component, handling file drag-and-drop and click-to-upload interactions. It displays different UI states based on drag activity, file selections, and preview modes.
// Parameters:
// - `children`: Custom content to render inside the drop zone.
// - `text`: The default instructional text for the drop zone.
// - `textProps`: Props to apply to the instructional text component.
// - `containerProps`: Props to apply to the main container component.
// - `disabled`: Boolean to disable interactions with the drop zone.
// - `accept`: String specifying allowed file types (e.g., 'image/*').
// - `multiple`: Boolean indicating if multiple files can be selected.
// - `isDragActive`: Boolean reflecting if a file is currently being dragged over the zone.
// - `handleDragEnter`, `handleDragLeave`, `handleDragOver`, `handleDrop`, `handleClick`, `handleFileChange`: Event handler functions for various user interactions (dragging, dropping, clicking, file selection).
// - `inputRef`: A ref object linked to the hidden file input element.
// - `preview`: A URL string for displaying a single file preview (e.g., an image thumbnail).
// - `imageProps`: Props to apply to the image preview component.
// - `selectedFiles`: An array of currently selected files, used for displaying multiple attachments.
// - `onRemove`: A callback function triggered when a file is to be removed from the selected files list.
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
      minHeight="200px"
      height={selectedFiles && selectedFiles.length > 0 ? 'auto' : '200px'}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={isDragActive ? 'theme-primary' : 'rgba(203, 213, 225, 0.95)'}
      borderRadius={12}
      backgroundColor={isDragActive ? '#EFF6FF' : '#F8FAFC'}
      flexDirection="column"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.6 : 1}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      transition="background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease"
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
      {}
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
          {}
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
                color={
                  isDragActive ? 'theme-primary' : 'rgba(100, 116, 139, 0.9)'
                }
              />
              <Text
                marginTop={16}
                color={
                  isDragActive ? 'theme-primary' : 'rgba(71, 85, 105, 0.95)'
                }
                fontWeight={500}
                textAlign="center"
                {...textProps}
              >
                {text}
              </Text>
            </View>
          )}
          {}
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
