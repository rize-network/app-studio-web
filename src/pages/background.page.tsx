import React from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { Background } from '../components/Background/Background';
import { Text } from '../components/Text/Text';

const BackgroundTestPage = () => {
  return (
    <Vertical gap={32} padding={32}>
      <Text fontSize={24} fontWeight="600">
        Background Component Test
      </Text>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Aurora Background
        </Text>
        <Background.Aurora height={300} width={300} showRadialGradient={true}>
          <Text color="white" fontSize={20} fontWeight="600">
            Aurora Effect Background
          </Text>
        </Background.Aurora>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Meteors Effect
        </Text>
        <Background.Meteors number={15} height={300} width={300} />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Wall Effect
        </Text>
        <Background.Wall
          rows={15}
          cols={10}
          squareSize={40}
          height={300}
          width={300}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Custom Wall Variations
        </Text>
        <Horizontal gap={16} flexWrap="wrap">
          <Background.Wall
            rows={8}
            cols={6}
            squareSize={30}
            height={200}
            width={250}
          />
          <Background.Wall
            rows={12}
            cols={8}
            squareSize={25}
            height={200}
            width={250}
          />
        </Horizontal>
      </Vertical>
    </Vertical>
  );
};

export default BackgroundTestPage;
