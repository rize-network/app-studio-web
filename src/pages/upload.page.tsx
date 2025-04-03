import React, { useState } from 'react';
import { View, Text } from 'app-studio';
import { Uploader } from 'src/components/Uploader/Uploader';
import { ImageIcon, UploadIcon, VideoIcon } from 'src/components/Icon/Icon';

const UploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = (file: File) => {
    setIsLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <View padding={16}>
      <Text fontSize={20} fontWeight={600}>
        Upload Files
      </Text>

      <View marginTop={24}>
        <Text fontSize={16} marginBottom={8}>
          Image Uploader
        </Text>
        <Uploader
          accept="image/*"
          icon={<ImageIcon widthHeight={32} />}
          maxSize={5 * 1024 * 1024}
          onFileSelect={simulateUpload}
          isLoading={isLoading}
          progress={progress}
          text="Upload Image"
        />
      </View>

      <View marginTop={32}>
        <Text fontSize={16}>File Uploader</Text>
        <Uploader
          icon={<UploadIcon widthHeight={32} />}
          maxSize={10 * 1024 * 1024}
          onFileSelect={simulateUpload}
          isLoading={isLoading}
          progress={progress}
          text="Upload File"
        />
      </View>

      <View marginTop={32}>
        <Text fontSize={16}>Video Uploader</Text>
        <Uploader
          accept="video/*"
          icon={<VideoIcon widthHeight={32} />}
          maxSize={100 * 1024 * 1024}
          onFileSelect={simulateUpload}
          isLoading={isLoading}
          progress={progress}
          text="Upload Video"
        />
      </View>
    </View>
  );
};

export default UploadPage;
