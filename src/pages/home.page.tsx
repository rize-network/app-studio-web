import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingImage from 'src/assets/orange.webp';
import { Button, Center, Horizontal, Text, Vertical } from 'src/components';
import { Features } from 'src/features';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/components');

  const media = React.useMemo(() => {
    return {
      container: {
        mobile: {
          paddingVertical: 30,
          paddingHorizontal: 10,
          gap: 30,
          backgroundSize: 290,
        },
        tablet: {
          backgroundSize: 490,
          paddingVertical: 50,
          paddingHorizontal: 20,
        },
        desktop: {
          backgroundSize: 610,
          paddingVertical: 100,
          paddingHorizontal: 30,
        },
      },
      title: {
        mobile: { fontSize: 48, lineHeight: 57, letterSpacing: 0 },
        tablet: { fontSize: 96, lineHeight: 112, letterSpacing: -1.5 },
        desktop: { fontSize: 110, lineHeight: 112, letterSpacing: -1.5 },
      },
      subtitle: {
        mobile: {
          fontSize: 24,
          lineHeight: 28,
          letterSpacing: 0,
        },
        tablet: { fontSize: 34, lineHeight: 40, letterSpacing: 0.25 },
        desktop: { fontSize: 48, lineHeight: 57, letterSpacing: 0 },
      },
      paragraph: {
        mobile: { fontSize: 10, lineHeight: 18, width: 300, height: 100 },
        tablet: { fontSize: 16, lineHeight: 24, width: 500, height: 120 },
        desktop: { fontSize: 22, lineHeight: 28, width: 600, height: 180 },
      },
      buttonText: {
        mobile: { fontSize: 14, lineHeight: 20 },
        tablet: { fontSize: 18, lineHeight: 24 },
        desktop: { fontSize: 24, lineHeight: 28 },
      },
      icon: {
        mobile: { width: 40, height: 40 },
        tablet: { width: 50, height: 50 },
        desktop: { width: 60, height: 60 },
      },
    };
  }, []);

  const buttonStyle = {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    whiteSpace: 'nowrap' as any,
    media: media.buttonText,
  };

  return (
    <Vertical
      gap={50}
      position="relative"
      flexWrap="nowrap"
      overflowY="scroll"
      color="warmGray.500"
      alignItems="center"
      scroll-behavior="smooth"
      backgroundImage={`url(${LandingImage})`}
      backgroundRepeat="no-repeat"
      backgroundPosition="top"
      media={media.container}
    >
      <Vertical gap={60} alignItems="center" media={{ mobile: { gap: 20 } }}>
        <Text
          width="100%"
          weight="bold"
          color="black"
          textAlign="center"
          whiteSpace="nowrap"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
          media={media.title}
        >
          App-Studio
        </Text>
        <Text textAlign="center" media={media.paragraph}>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
          ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
          egestas semper. Aenean ultricies mi vitae est. Mauris placerat
          eleifend leo.
        </Text>

        <Center
          width="100%"
          gap={60}
          media={{ mobile: { gap: 10 } }}
          flexWrap="nowrap"
        >
          <Button
            colorScheme="black"
            onClick={handleClick}
            {...buttonStyle}
            isAuto
          >
            Get Started
          </Button>
          <Button variant="outline" colorScheme="black" {...buttonStyle} isAuto>
            Deploy Now
          </Button>
        </Center>
      </Vertical>
      <Vertical gap={30} width="100%">
        <Text
          width="100%"
          color="black"
          weight="semiBold"
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.1)"
          media={media.subtitle}
        >
          Discover our features
        </Text>
        <Horizontal justifyContent="space-evenly" gap={30}>
          {Features.map((feature) => (
            <Vertical
              key={feature.title}
              gap={7}
              width={400}
              minHeight={100}
              alignItems="center"
            >
              <Center
                color="white"
                borderRadius="50%"
                padding="10px"
                backgroundColor="theme.primary"
                media={media.icon}
              >
                {feature.icon}
              </Center>
              <Text
                weight="bold"
                color="black"
                size={'lg'}
                media={{ mobile: { fontSize: 14, lineHeight: 14 } }}
              >
                {feature.title}
              </Text>
              <Text
                textAlign="center"
                size={'md'}
                media={{ mobile: { fontSize: 12, lineHeight: 12 } }}
              >
                {feature.description}
              </Text>
            </Vertical>
          ))}
        </Horizontal>
      </Vertical>
    </Vertical>
  );
};

export default HomePage;
