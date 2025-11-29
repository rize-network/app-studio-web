import React from 'react';
import { Vertical, Horizontal } from 'app-studio';
import { Background } from '../components/Background/Background';
import { Text } from 'app-studio';

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

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Particles Effect
        </Text>
        <Background.Particles
          count={50}
          speed="medium"
          shapes={['circle', 'square', 'triangle']}
          height={300}
          width={400}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Grid Effect
        </Text>
        <Background.Grid
          gridSize={30}
          animationSpeed="medium"
          height={300}
          width={400}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Ripples Effect
        </Text>
        <Background.Ripples
          rippleCount={5}
          maxSize={200}
          frequency={3}
          height={300}
          width={400}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Image
        </Text>
        <Background.Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
          height={300}
          width={400}
          backgroundSize="cover"
          overlay="rgba(0,0,0,0.4)"
          blendMode="multiply"
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Image Background with Overlay
          </Text>
        </Background.Image>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Video
        </Text>
        <Background.Video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          height={300}
          width={400}
          overlay="rgba(0,0,0,0.4)"
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Video Background
          </Text>
        </Background.Video>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Gradient
        </Text>
        <Background.Gradient
          from="color.blue.500"
          to="color.purple.500"
          height={300}
          width={400}
          animate={true}
          animationDuration={4}
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Animated Gradient Background
          </Text>
        </Background.Gradient>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Multi-color Radial Gradient
        </Text>
        <Background.Gradient
          type="radial"
          colors={[
            { color: 'color.red.500', position: '0%' },
            { color: 'color.orange.500', position: '50%' },
            { color: 'color.yellow.500', position: '100%' },
          ]}
          height={300}
          width={400}
          shape="ellipse"
          position="top-left"
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Radial Multi-color Gradient
          </Text>
        </Background.Gradient>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Mixed Effects Showcase
        </Text>
        <Horizontal gap={16} flexWrap="wrap">
          <Background.Particles
            count={30}
            speed="fast"
            shapes={['circle']}
            height={200}
            width={250}
          />
          <Background.Grid
            gridSize={20}
            animationSpeed="fast"
            height={200}
            width={250}
          />
          <Background.Ripples
            rippleCount={3}
            maxSize={100}
            frequency={2}
            height={200}
            width={250}
          />
        </Horizontal>
      </Vertical>
    </Vertical>
  );
};

export default BackgroundTestPage;
