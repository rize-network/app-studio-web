import React, { useState } from 'react';
import { View, Text } from 'app-studio';
import { Uploader } from 'src/components/Uploader/Uploader';
import { ImageIcon, UploadIcon, VideoIcon } from 'src/components/Icon/Icon';

const UploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [isMultipleLoading, setIsMultipleLoading] = useState(false);
  const [multipleProgress, setMultipleProgress] = useState(0);

  const simulateUpload = (file: File) => {
    // Log file info for debugging
    console.log('Uploading file:', file.name, file.type, file.size);

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

  const simulateMultipleUpload = (files: File[]) => {
    // Log files info for debugging
    console.log(
      'Uploading multiple files:',
      files.map((f) => ({ name: f.name, type: f.type, size: f.size }))
    );

    setMultipleFiles(files);
    setIsMultipleLoading(true);
    setMultipleProgress(0);

    const interval = setInterval(() => {
      setMultipleProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsMultipleLoading(false);
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
          fileType="image"
          containerProps={{ height: progress === 100 ? '200px' : 'auto' }}
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
          fileType="file"
          containerProps={{ height: progress === 100 ? '200px' : 'auto' }}
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
          fileType="video"
          containerProps={{ height: progress === 100 ? '200px' : 'auto' }}
        />
      </View>

      {/* Multiple File Upload Examples */}
      <View marginTop={48}>
        <Text fontSize={18} fontWeight={600} marginBottom={16}>
          Multiple File Upload Examples
        </Text>

        <View marginTop={24}>
          <Text fontSize={16} marginBottom={8}>
            Multiple Images Uploader
          </Text>
          <Uploader
            accept="image/*"
            icon={<ImageIcon widthHeight={32} />}
            maxSize={5 * 1024 * 1024}
            multiple={true}
            onMultipleFileSelect={simulateMultipleUpload}
            isLoading={isMultipleLoading}
            progress={multipleProgress}
            text="Upload Multiple Images"
            fileType="image"
            containerProps={{
              height: multipleProgress === 100 ? '200px' : 'auto',
            }}
          />
          {multipleFiles.length > 0 && (
            <View
              marginTop={12}
              padding={12}
              backgroundColor="color.gray.50"
              borderRadius={8}
            >
              <Text fontSize={14} fontWeight={600} marginBottom={8}>
                Selected Files ({multipleFiles.length}):
              </Text>
              {multipleFiles.map((file, index) => (
                <Text key={index} fontSize={12} color="color.gray.600">
                  • {file.name} ({Math.round(file.size / 1024)}KB)
                </Text>
              ))}
            </View>
          )}
        </View>

        <View marginTop={32}>
          <Text fontSize={16} marginBottom={8}>
            Multiple Documents Uploader
          </Text>
          <Uploader
            accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
            icon={<UploadIcon widthHeight={32} />}
            maxSize={10 * 1024 * 1024}
            multiple={true}
            onMultipleFileSelect={(files) => {
              console.log(
                'Document files:',
                files.map((f) => f.name)
              );
              simulateMultipleUpload(files);
            }}
            isLoading={isMultipleLoading}
            progress={multipleProgress}
            text="Upload Multiple Documents"
            fileType="file"
            containerProps={{
              height: multipleProgress === 100 ? '200px' : 'auto',
            }}
          />
        </View>

        <View marginTop={32}>
          <Text fontSize={16} marginBottom={8}>
            Any File Type (Multiple)
          </Text>
          <Uploader
            accept="*/*"
            icon={<UploadIcon widthHeight={32} />}
            maxSize={50 * 1024 * 1024}
            multiple={true}
            onMultipleFileSelect={(files) => {
              console.log(
                'Mixed files:',
                files.map((f) => ({ name: f.name, type: f.type }))
              );
              simulateMultipleUpload(files);
            }}
            validateFile={(file) => {
              // Custom validation example
              if (file.name.includes('test')) {
                return 'Files with "test" in the name are not allowed';
              }
              return null;
            }}
            isLoading={isMultipleLoading}
            progress={multipleProgress}
            text="Upload Any Files (with validation)"
            fileType="file"
            containerProps={{
              height: multipleProgress === 100 ? '200px' : 'auto',
            }}
          />
        </View>

        <View marginTop={32}>
          <Text fontSize={16} marginBottom={8}>
            Chat-Style Multiple Upload
          </Text>
          <Text fontSize={14} color="color.gray.600" marginBottom={12}>
            This demonstrates the same functionality used in ChatInput component
          </Text>
          <Uploader
            accept="*/*"
            icon={<UploadIcon widthHeight={16} />}
            maxSize={50 * 1024 * 1024}
            multiple={true}
            onMultipleFileSelect={(files) => {
              console.log(
                'Chat files:',
                files.map((f) => f.name)
              );
              simulateMultipleUpload(files);
            }}
            isLoading={isMultipleLoading}
            progress={multipleProgress}
            text="Attachments"
            fileType="file"
            views={{
              container: {
                height: '40px',
                padding: '0 12px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'color.gray.300',
                cursor: 'pointer',
                _hover: {
                  backgroundColor: 'color.gray.100',
                },
              },
            }}
            containerProps={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            textProps={{
              fontSize: '14px',
              color: 'color.gray.600',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPage;
