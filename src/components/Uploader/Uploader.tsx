import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, Text, Image, Horizontal } from 'app-studio';
import { UploadIcon, PlayIcon } from '../Icon/Icon';
import { UploadProps, UseUploadProps } from './Uploader.props';
import { showMessage } from '../Message/Message';
import { Center } from '../Layout';

export const useUpload = ({
  maxSize = 100 * 1024 * 1024, // 100MB default
  onFileSelect,
  validateFile,
  thumbnail,
  onError = (error: string) => {
    showMessage('error', 'Error', error);
  },
}: UseUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    thumbnail || null
  );
  const generateThumbnail = (videoFile: File) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      video.currentTime = 1;
    };

    video.oncanplay = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
        setThumbnailUrl(thumbnailDataUrl);
      }

      URL.revokeObjectURL(video.src);
    };

    video.src = URL.createObjectURL(videoFile);
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setErrorMessage(null);

      if (!file) {
        onError('No file selected');
        setErrorMessage('No file selected');
        return;
      }

      if (file.size > maxSize) {
        onError(`File exceeds ${Math.round(maxSize / (1024 * 1024))}MB.`);
        setErrorMessage(
          `File exceeds ${Math.round(maxSize / (1024 * 1024))}MB.`
        );
        return;
      }

      if (validateFile) {
        const validationError = validateFile(file);
        if (validationError) {
          onError(validationError);
          setErrorMessage(validationError);
          return;
        }
      }

      setPreviewUrl(URL.createObjectURL(file));

      if (file.type.startsWith('video/')) {
        generateThumbnail(file);
      }

      if (onFileSelect) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [maxSize, onFileSelect, validateFile]
  );

  const handleClick = () => fileInputRef.current?.click();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    };
  }, [previewUrl, thumbnailUrl]);

  return {
    previewUrl,
    thumbnailUrl,
    errorMessage,
    fileInputRef,
    videoRef,
    selectedFile,
    handleFileChange,
    handleClick,
  };
};

export const Uploader: React.FC<UploadProps> = ({
  accept = '*/*',
  isLoading = false,
  progress = 0,
  icon,
  text,
  maxSize,
  onFileSelect,
  validateFile,
  containerProps,
  errorMessageProps,
  progressProps,
  videoProps,
  imageProps,
  iconProps,
  textProps,
  renderError = ({ errorMessage, errorMessageProps }) => (
    <Text color="red" fontSize={12} marginTop={8} {...errorMessageProps}>
      {errorMessage}
    </Text>
  ),
  renderText = ({ text, textProps }) => (
    <Text marginTop={8} {...textProps}>
      {text}
    </Text>
  ),
  renderFile = ({ selectedFile, textProps }) => {
    return (
      <Center marginTop={8} gap={10} flexDirection="column">
        <Text maxLines={2} {...textProps}>
          {selectedFile.name}
        </Text>
        <Text {...textProps}>({Math.round(selectedFile.size / 1024)} KB)</Text>
      </Center>
    );
  },
  renderVideo = ({
    selectedFile,
    thumbnailUrl,
    videoRef,
    videoProps,
    imageProps,
    iconProps,
  }) => {
    console.log('thumbnailUrl', thumbnailUrl);
    return (
      <View width="100%" height="100%" position="relative">
        <View
          as="video"
          width={0}
          height={0}
          src={selectedFile?.name}
          style={{ objectFit: 'cover' }}
          ref={videoRef}
          {...videoProps}
        />
        <Image
          src={thumbnailUrl}
          alt="Video Thumbnail"
          width="100%"
          height="100%"
          objectFit="cover"
          {...imageProps}
        />
        <PlayIcon
          position="absolute"
          top="50%"
          left="50%"
          color="white"
          size={'20%'}
          transform="translate(-50%, -50%)"
          {...iconProps}
        />
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
      />
    );
  },
  renderProgress = ({ progress, progressProps }) => {
    return (
      <Horizontal gap={8} alignItems="center" {...progressProps}>
        <View
          height={4}
          backgroundColor="rgba(0,0,0,0.1)"
          width="100%"
          borderRadius={2}
        >
          <View height={4} width={`${progress}%`} borderRadius={2} />
        </View>
        <Text fontSize={12}>{progress}%</Text>
      </Horizontal>
    );
  },
}) => {
  const {
    previewUrl,
    thumbnailUrl,
    errorMessage,
    videoRef,
    fileInputRef,
    selectedFile,
    handleFileChange,
    handleClick,
  } = useUpload({ accept, maxSize, onFileSelect, validateFile });

  const fileType =
    previewUrl && accept.includes('video')
      ? 'video'
      : previewUrl && accept.includes('image')
      ? 'image'
      : 'file';

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
    >
      {progress == 100 &&
        fileType == 'image' &&
        previewUrl &&
        renderImage({ previewUrl, imageProps })}
      {progress == 100 &&
        fileType == 'video' &&
        thumbnailUrl &&
        renderVideo({ thumbnailUrl, videoRef, videoProps, iconProps })}

      {progress == 100 &&
        fileType == 'file' &&
        previewUrl &&
        renderFile({ selectedFile, textProps })}

      {progress < 100 && (icon || <UploadIcon size={32} {...iconProps} />)}

      {!selectedFile && text && renderText({ text, textProps })}
      {isLoading && renderProgress({ progress, progressProps })}
      {renderError({ errorMessage, errorMessageProps })}
      <View
        as="input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: 'none' }}
      />
    </Center>
  );
};
