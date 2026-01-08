import React from 'react';
import {
  IconButtons,
  VariantButtons,
  ButtonSizes,
  DisabledButton,
  LoaderButtons,
  BorderMovingButtons,
  AnimatedStrokeButtons,
  BorderRevealButtons,
  ShareButtons,
  SubtleButtons,
} from 'src/components/Button/examples';
import { View, Horizontal, Vertical, Text, useTheme } from 'app-studio';
import { Button } from 'src/components/Button/Button';

export const ButtonPage = () => {
  const { themeMode } = useTheme();

  return (
    <View padding={20} backgroundColor="theme.background" minHeight="100vh">
      <View gap={32} display="flex" flexDirection="column">
        {/* Helper for sections */}
        {Object.entries({
          'Colors & Branding': (
            <Vertical gap={24}>
              <View>
                <Text
                  fontSize={14}
                  marginBottom={12}
                  fontWeight="600"
                  color="theme.primary"
                >
                  Theme Tokens
                </Text>
                <Horizontal gap={12} wrap="wrap">
                  <Button color="theme.primary">Primary</Button>
                  <Button color="theme.secondary">Secondary</Button>
                  <Button color="theme.success">Success</Button>
                  <Button color="theme.warning">Warning</Button>
                  <Button color="theme.error">Error</Button>
                </Horizontal>
              </View>

              <View>
                <Text
                  fontSize={14}
                  marginBottom={12}
                  fontWeight="600"
                  color="theme.primary"
                >
                  Color Palette
                </Text>
                <Horizontal gap={12} wrap="wrap">
                  <Button color="color.blue.500">Blue 500</Button>
                  <Button color="color.purple.500">Purple 500</Button>
                  <Button color="color.pink.500">Pink 500</Button>
                  <Button color="color.black">Black</Button>
                  <Button color="color.white" textColor="color.black">
                    White
                  </Button>
                </Horizontal>
              </View>

              <View>
                <Text
                  fontSize={14}
                  marginBottom={12}
                  fontWeight="600"
                  color="theme.primary"
                >
                  Explicit Text Control
                </Text>
                <Horizontal gap={12} wrap="wrap">
                  <Button color="color.yellow.400" textColor="color.black">
                    Yellow + Black
                  </Button>
                  <Button color="color.cyan.300" textColor="color.gray.900">
                    Cyan + Dark
                  </Button>
                  <Button
                    backgroundColor="color.gray.100"
                    textColor="color.gray.800"
                  >
                    Custom Tokens
                  </Button>
                </Horizontal>
              </View>
            </Vertical>
          ),
          'Variants & Schemes': <VariantButtons />,
          Shapes: (
            <Horizontal gap={12} wrap="wrap">
              <Button shape="square" color="theme.primary">
                square edges
              </Button>
              <Button shape="rounded" color="theme.primary">
                Rounded edges
              </Button>
              <Button shape="pill" color="theme.primary">
                Pill Shaped
              </Button>
            </Horizontal>
          ),
          'Interactive Effects': (
            <View display="flex" flexDirection="column" gap={16}>
              <BorderMovingButtons />
              <AnimatedStrokeButtons />
              <BorderRevealButtons />
            </View>
          ),
          'Sizes & States': (
            <Horizontal gap={40} alignItems="flex-start">
              <View flex={1}>
                <Text
                  fontSize={14}
                  marginBottom={12}
                  fontWeight="600"
                  color="theme.primary"
                >
                  Standard Sizes
                </Text>
                <ButtonSizes />
              </View>
              <View flex={1}>
                <Text
                  fontSize={14}
                  marginBottom={12}
                  fontWeight="600"
                  color="theme.primary"
                >
                  States
                </Text>
                <DisabledButton />
              </View>
            </Horizontal>
          ),
          'Loaders & Icons': (
            <Horizontal gap={40} alignItems="flex-start">
              <View flex={1}>
                <Text
                  fontSize={14}
                  marginBottom={12}
                  fontWeight="600"
                  color="theme.primary"
                >
                  Loading States
                </Text>
                <LoaderButtons />
              </View>
              <View flex={1}>
                <Text
                  fontSize={14}
                  marginBottom={12}
                  fontWeight="600"
                  color="theme.primary"
                >
                  Icon Support
                </Text>
                <IconButtons />
              </View>
            </Horizontal>
          ),
          'Social & Specialized': (
            <View display="flex" gap={16} flexDirection="column">
              <ShareButtons />
              <SubtleButtons />
            </View>
          ),
        }).map(([title, content]) => (
          <View
            key={title}
            backgroundColor={
              themeMode === 'light' ? 'color.white' : 'color.gray.900'
            }
            padding={32}
            borderRadius={16}
            boxShadow="0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.05)"
            borderWidth={1}
            borderColor={
              themeMode === 'light' ? 'color.gray.100' : 'color.gray.800'
            }
          >
            <Text
              fontSize={20}
              marginBottom={24}
              fontWeight="600"
              color="theme.primary"
            >
              {title}
            </Text>
            <View
              backgroundColor={
                themeMode === 'light' ? 'color.gray.50' : 'color.gray.800'
              }
              padding={24}
              borderRadius={12}
              borderWidth={1}
              borderColor={
                themeMode === 'light' ? 'color.gray.100' : 'color.gray.700'
              }
              borderStyle="dashed"
            >
              {content}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ButtonPage;
