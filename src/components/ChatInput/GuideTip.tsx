import React from 'react';
import { Text, View } from 'app-studio';
import { CloseIcon } from '../Icon/Icon';
// Defines the properties expected by the GuideTip component.
interface GuideTipProps {
  // Optional URL for a video guide to be displayed within the tip.
  videoUrl?: string;
  // A callback function to be executed when the tip's close button is clicked.
  onClose: () => void;
  // Optional object to provide custom styles or properties for specific internal view components.
  views?: {
    // Custom properties to apply to the main container View component of the tip.
    container?: any;
    // Custom properties to apply to the video element if `videoUrl` is provided.
    video?: any;
    // Custom properties to apply to the close button element.
    closeButton?: any;
  };
}
// Defines the GuideTip functional component, which displays a helpful tip, potentially with a video, and a close button.
export const GuideTip: React.FC<GuideTipProps> = ({
  videoUrl,
  onClose,
  views = {},
}) => {
  return (
    <View
      position="relative"
      width="100%"
      padding="16px"
      backgroundColor="color-blue-50"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="color-blue-200"
      borderRadius="12px"
      marginBottom="16px"
      animate={{
        from: { opacity: 0, transform: 'translateX(-20px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      }}
      animationDuration={0.3}
      {...views?.container}
    >
      <Text
        fontSize="14px"
        color="color-blue-800"
        marginBottom="8px"
        lineHeight="20px"
      >
        Need help? Watch this quick guide to get started.
      </Text>
      {videoUrl && (
        <View
          as="video"
          src={videoUrl}
          controls
          width="100%"
          height="auto"
          borderRadius="8px"
          {...views?.video}
        />
      )}
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
        transition="background-color 0.2s ease, opacity 0.2s ease"
        onClick={onClose}
        _hover={{
          backgroundColor: '#DBEAFE',
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
    </View>
  );
};
