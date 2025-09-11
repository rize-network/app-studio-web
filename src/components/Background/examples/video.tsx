import React from 'react';
import { Background } from '../Background';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const VideoDemo = () => (
  <Vertical gap={16}>
    <Text fontSize={16} fontWeight="600">
      Video Background
    </Text>
    <Background.Video
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      height="200px"
      overlay="rgba(0,0,0,0.3)"
    >
      <Text color="white" fontSize={18} fontWeight="500">
        Video Background
      </Text>
    </Background.Video>
  </Vertical>
);

export default VideoDemo;
