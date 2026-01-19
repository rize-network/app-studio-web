import React from 'react';
import { Vertical, Horizontal, View, Text, useTheme } from 'app-studio';
import { Background } from '../components/Background/Background';

const BackgroundTestPage = () => {
  const { themeMode } = useTheme();

  const sections = {
    'Aurora Background': (
      <Background.Aurora height={300} width="100%" showRadialGradient={true}>
        <Text color="color-white" fontSize={20} fontWeight="600">
          Aurora Effect Background
        </Text>
      </Background.Aurora>
    ),
    'Meteor & Wall Effects': (
      <Horizontal gap={24} flexWrap="wrap">
        <Vertical gap={12} flex={1}>
          <Text fontSize={14} fontWeight="600" color="theme-primary">
            Meteors
          </Text>
          <Background.Meteors number={15} height={300} width="100%" />
        </Vertical>
        <Vertical gap={12} flex={1}>
          <Text fontSize={14} fontWeight="600" color="theme-primary">
            Wall
          </Text>
          <Background.Wall
            rows={15}
            cols={10}
            squareSize={40}
            height={300}
            width="100%"
          />
        </Vertical>
      </Horizontal>
    ),
    'Particles & Grid': (
      <Horizontal gap={24} flexWrap="wrap">
        <Vertical gap={12} flex={1}>
          <Text fontSize={14} fontWeight="600" color="theme-primary">
            Particles
          </Text>
          <Background.Particles
            count={50}
            speed="medium"
            shapes={['circle', 'square', 'triangle']}
            height={300}
            width="100%"
          />
        </Vertical>
        <Vertical gap={12} flex={1}>
          <Text fontSize={14} fontWeight="600" color="theme-primary">
            Grid
          </Text>
          <Background.Grid
            gridSize={30}
            animationSpeed="medium"
            height={300}
            width="100%"
          />
        </Vertical>
      </Horizontal>
    ),
    'Ripples & Gradients': (
      <Horizontal gap={24} flexWrap="wrap">
        <Vertical gap={12} flex={1}>
          <Text fontSize={14} fontWeight="600" color="theme-primary">
            Ripples
          </Text>
          <Background.Ripples
            rippleCount={5}
            maxSize={200}
            frequency={3}
            height={300}
            width="100%"
          />
        </Vertical>
        <Vertical gap={12} flex={1}>
          <Text fontSize={14} fontWeight="600" color="theme-primary">
            Animated Gradient
          </Text>
          <Background.Gradient
            from="color-blue-500"
            to="color-purple-500"
            height={300}
            width="100%"
            animate={true}
            animationDuration={4}
          >
            <Text color="color-white" fontSize={20} fontWeight="600">
              Animated
            </Text>
          </Background.Gradient>
        </Vertical>
      </Horizontal>
    ),
    'Image & Video with Overlay': (
      <Horizontal gap={24} flexWrap="wrap">
        <Background.Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
          height={300}
          width="48%"
          backgroundSize="cover"
          overlay={<Background.Overlay />}
        >
          <Text color="color-white" fontSize={18} fontWeight="600">
            Image + Overlay
          </Text>
        </Background.Image>
        <Background.Video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          height={300}
          width="48%"
          overlay={<Background.Overlay />}
        >
          <Text color="color-white" fontSize={18} fontWeight="600">
            Video + Overlay
          </Text>
        </Background.Video>
      </Horizontal>
    ),
    'Overlay Content Positioning': (
      <Vertical gap={24}>
        <Background.Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop"
          height={300}
          width="100%"
          overlay={<Background.Overlay contentPosition="left" />}
          views={{
            content: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 40,
            },
          }}
        >
          <Vertical gap={8} maxWidth={400}>
            <Text color="color-white" fontSize={32} fontWeight="700">
              Left Aligned
            </Text>
            <Text color="color-gray-200" fontSize={16}>
              The overlay gradient focuses seamlessly on the content placed on the
              left side.
            </Text>
          </Vertical>
        </Background.Image>

        <Background.Image
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
          height={300}
          width="100%"
          overlay={<Background.Overlay contentPosition="right" />}
          views={{
            content: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 40,
            },
          }}
        >
          <Vertical gap={8} maxWidth={400} alignItems="flex-end">
            <Text
              color="color-white"
              fontSize={32}
              fontWeight="700"
              textAlign="right"
            >
              Right Aligned
            </Text>
            <Text color="color-gray-200" fontSize={16} textAlign="right">
              Content pushed to the right with a matching generic gradient
              overlay.
            </Text>
          </Vertical>
        </Background.Image>

        <Background.Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
          height={300}
          width="100%"
          overlay={<Background.Overlay contentPosition="bottom" />}
          views={{
            content: {
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 40,
            },
          }}
        >
          <Vertical gap={8} maxWidth={600} alignItems="center">
            <Text
              color="color-white"
              fontSize={32}
              fontWeight="700"
              textAlign="center"
            >
              Bottom Aligned
            </Text>
            <Text color="color-gray-200" fontSize={16} textAlign="center">
              Perfect for hero sections where the focus is on the bottom area.
            </Text>
          </Vertical>
        </Background.Image>
      </Vertical>
    ),
    'Layout Concept': (
      <Background.Layout>
        <Vertical alignItems="center" gap={16} paddingVertical={40}>
          <Text
            fontSize={32}
            fontWeight="700"
            color="theme-primary"
            textAlign="center"
          >
            Theme Aware Layout
          </Text>
          <Text
            fontSize={18}
            color={themeMode === 'light' ? 'color-gray-600' : 'color-gray-400'}
            textAlign="center"
            maxWidth={600}
          >
            The background layout component adapts to your application theme
            automatically.
          </Text>
          <Horizontal gap={16} marginTop={32}>
            <View
              backgroundColor={
                themeMode === 'light' ? 'color-white' : 'color-gray-800'
              }
              padding={24}
              borderRadius={12}
              boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              borderColor={
                themeMode === 'light' ? 'color-gray-100' : 'color-gray-700'
              }
              borderWidth={1}
            >
              <Text fontWeight="600" color="theme-primary">
                Card 1
              </Text>
            </View>
            <View
              backgroundColor={
                themeMode === 'light' ? 'color-white' : 'color-gray-800'
              }
              padding={24}
              borderRadius={12}
              boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              borderColor={
                themeMode === 'light' ? 'color-gray-100' : 'color-gray-700'
              }
              borderWidth={1}
            >
              <Text fontWeight="600" color="theme-primary">
                Card 2
              </Text>
            </View>
          </Horizontal>
        </Vertical>
      </Background.Layout>
    ),
  };

  return (
    <View padding={20} backgroundColor="theme-background" minHeight="100vh">
      <Text
        fontSize={28}
        fontWeight="700"
        marginBottom={32}
        color="theme-primary"
      >
        Background Effects
      </Text>
      <View gap={32} display="flex" flexDirection="column">
        {Object.entries(sections).map(([title, content]) => (
          <View
            key={title}
            backgroundColor={
              themeMode === 'light' ? 'color-white' : 'color-gray-900'
            }
            padding={32}
            borderRadius={16}
            boxShadow="0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.05)"
            borderWidth={1}
            borderColor={
              themeMode === 'light' ? 'color-gray-100' : 'color-gray-800'
            }
          >
            <Text
              fontSize={20}
              marginBottom={24}
              fontWeight="600"
              color="theme-primary"
            >
              {title}
            </Text>
            <View
              backgroundColor={
                themeMode === 'light' ? 'color-gray-50' : 'color-gray-800'
              }
              padding={24}
              borderRadius={12}
              borderWidth={1}
              borderColor={
                themeMode === 'light' ? 'color-gray-100' : 'color-gray-700'
              }
              borderStyle="dashed"
              overflow="hidden"
            >
              {content}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BackgroundTestPage;
