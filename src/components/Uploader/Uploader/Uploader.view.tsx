import React from 'react';
import { View, Text, Image, Horizontal } from 'app-studio';
import { UploadIcon } from '../../Icon/Icon';
import { UploadStateProps, UploadViewProps } from './Uploader.props';
import { Center } from '../../Layout';

export const UploadView: React.FC<UploadViewProps & UploadStateProps> = ({
  accept,
  isLoading = false,
  progress = 0,
  icon,
  text,
  previewUrl,
  thumbnailUrl,
  errorMessage,
  fileInputRef,
  videoRef,
  selectedFile,
  handleFileChange,
  handleClick,
  containerProps,
  errorMessageProps,
  progressProps,
  videoProps,
  imageProps,
  iconProps,
  textProps,
  fileType,
  previewUrl: externalPreviewUrl,
  renderError = ({ errorMessage, errorMessageProps }) => (
    <Text
      color="red"
      fontSize={12}
      marginTop={8}
      {...errorMessageProps}
      {...views?.text}
    >
      {errorMessage}
    </Text>
  ),
  renderText = ({ text, textProps }) => (
    <Text marginTop={8} {...textProps} {...views?.text}>
      {text}
    </Text>
  ),
  renderFile = ({ selectedFile, textProps }) => {
    return selectedFile ? (
      <Center
        marginTop={8}
        gap={10}
        flexDirection="column"
        {...views?.container}
      >
        <Text maxLines={2} {...textProps} {...views?.text}>
          {selectedFile.name}
        </Text>
        <Text {...textProps} {...views?.text}>
          ({Math.round(selectedFile.size / 1024)} KB)
        </Text>
      </Center>
    ) : null;
  },
  renderVideo = ({
    selectedFile,
    thumbnailUrl,
    videoRef,
    videoProps,
    imageProps,
  }) => {
    return (
      <View width="100%" height="100%" position="relative" {...views?.view}>
        <View
          as="video"
          width="100%"
          height="100%"
          src={selectedFile ? URL.createObjectURL(selectedFile) : undefined}
          style={{ objectFit: 'cover' }}
          ref={videoRef}
          {...videoProps}
          {...views?.view}
        />
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt="Video Thumbnail"
            width="100%"
            height="100%"
            objectFit="cover"
            {...imageProps}
            {...views?.image}
          />
        )}
      </View>
    );
  },
  renderImage = ({ previewUrl, imageProps }) => {
    return (
      <Image
        src={previewUrl}
        alt="Preview"
        width="100%"
        height="100%"
        objectFit="cover"
        {...imageProps}
        {...views?.image}
      />
    );
  },
  renderProgress = ({ progress, progressProps }) => {
    return (
      <Horizontal
        gap={8}
        alignItems="center"
        {...progressProps}
        {...views?.horizontal}
      >
        <View
          height={4}
          backgroundColor="rgba(0,0,0,0.1)"
          width="100%"
          borderRadius={2}
          {...views?.view}
        >
          <View
            height={4}
            width={`${progress}%`}
            borderRadius={2}
            backgroundColor="#000"
            {...views?.view}
          />
        </View>
        <Text fontSize={12} {...views?.text}>
          {progress}%
        </Text>
      </Horizontal>
    );
  },
  views = {},
}) => {
  const finalPreviewUrl = externalPreviewUrl || previewUrl;

  return (
    <Center
      onClick={handleClick}
      cursor="pointer"
      border="1px solid rgba(0,0,0,0.1)"
      borderRadius={8}
      padding={16}
      flexDirection="column"
      overflow="hidden"
      position="relative"
      {...containerProps}
      {...views?.container}
    >
      {progress === 100 &&
        fileType === 'image' &&
        finalPreviewUrl &&
        renderImage({ previewUrl: finalPreviewUrl, imageProps })}
      {progress === 100 &&
        fileType === 'video' &&
        thumbnailUrl &&
        renderVideo({
          selectedFile,
          thumbnailUrl,
          videoRef,
          videoProps,
          imageProps,
        })}
      {progress === 100 &&
        fileType === 'file' &&
        selectedFile &&
        renderFile({ selectedFile, textProps })}
      {progress < 100 &&
        (icon || <UploadIcon widthHeight={32} {...iconProps} />)}
      {!selectedFile && text && renderText({ text, textProps })}
      {isLoading && renderProgress({ progress, progressProps })}
      {errorMessage && renderError({ errorMessage, errorMessageProps })}
      <View
        as="input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: 'none' }}
        {...views?.view}
      />
    </Center>
  );
};
