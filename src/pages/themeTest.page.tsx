import React, { useState } from 'react';
import { ThemeProvider, View, Text, Vertical, Horizontal } from 'app-studio';
import { Card, Button } from 'src/components';

export const ThemeTestPage = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = {
    primary: '#3b82f6',
    secondary: '#63b3ed',
    error: '#ef4444',
    warning: '#f59e0b',
    disabled: '#9ca3af',
    loading: '#3b82f6',
    background: 'color.gray.300',
  };

  return (
    <ThemeProvider mode={mode} theme={theme}>
      <View
        width="100vw"
        minHeight="100vh"
        backgroundColor="color.black"
        padding={40}
      >
        <Vertical gap={40}>
          <Horizontal justifyContent="space-between" alignItems="center">
            <Text fontSize={32} fontWeight="bold">
              Theme Test Page
            </Text>
            <Button onClick={toggleMode}>
              Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </Horizontal>

          <Vertical gap={20}>
            <Text fontSize={24} fontWeight="bold">
              Current Mode
            </Text>
            <Text>
              This page demonstrates the theming capabilities of App Studio.
            </Text>
          </Vertical>

          {/* System Colors Section */}
          <Card padding={20} backgroundColor="theme.background">
            <Vertical gap={20}>
              <Text fontSize={20} fontWeight="bold" color="color.black">
                System Colors (color.x.y)
              </Text>
              <Horizontal gap={20} flexWrap="wrap">
                <View
                  width={100}
                  height={100}
                  backgroundColor="color.blue.500"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white">Blue 500</Text>
                </View>
                <View
                  width={100}
                  height={100}
                  backgroundColor="color.emerald.500"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white">Emerald 500</Text>
                </View>
                <View
                  width={100}
                  height={100}
                  backgroundColor="color.red.500"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white">Red 500</Text>
                </View>
                <View
                  width={100}
                  height={100}
                  backgroundColor="color.amber.500"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white">Amber 500</Text>
                </View>
              </Horizontal>
            </Vertical>
          </Card>

          {/* Mode Specific Colors Section */}
          <Card padding={20} backgroundColor="theme.background">
            <Vertical gap={20}>
              <Text fontSize={20} fontWeight="bold" color="color.black">
                Mode Specific Colors (light.x / dark.x)
              </Text>
              <Horizontal gap={20} flexWrap="wrap">
                <View
                  width={150}
                  height={100}
                  backgroundColor="light.blue.100"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                  padding={10}
                >
                  <Text color="light.blue.900" textAlign="center">
                    Always Light Blue (light.blue.100)
                  </Text>
                </View>
                <View
                  width={150}
                  height={100}
                  backgroundColor="dark.blue.900"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                  padding={10}
                >
                  <Text color="dark.blue.100" textAlign="center">
                    Always Dark Blue (dark.blue.900)
                  </Text>
                </View>
              </Horizontal>
            </Vertical>
          </Card>

          {/* Smart Contrast Section */}
          <Card padding={20} backgroundColor="theme.background">
            <Vertical gap={20}>
              <Text fontSize={20} fontWeight="bold" color="color.black">
                Smart Text Contrast
              </Text>
              <Horizontal gap={20} flexWrap="wrap">
                <View
                  width={150}
                  height={100}
                  backgroundColor="black"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>Visible on Black</Text>
                </View>
                <View
                  width={150}
                  height={100}
                  backgroundColor="white"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={1}
                  borderColor="color.gray.200"
                >
                  <Text>Visible on White</Text>
                </View>
                <View
                  width={150}
                  height={100}
                  backgroundColor="color.blue.500"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>Visible on Blue</Text>
                </View>
              </Horizontal>
            </Vertical>
          </Card>

          {/* Theme Tokens Section */}
          <Card padding={20} backgroundColor="theme.background">
            <Vertical gap={20}>
              <Text fontSize={20} fontWeight="bold" color="color.black">
                Theme Tokens (theme.x)
              </Text>
              <Horizontal gap={20} flexWrap="wrap">
                <Button variant="filled">Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </Horizontal>
            </Vertical>
          </Card>
        </Vertical>
      </View>
    </ThemeProvider>
  );
};

export default ThemeTestPage;
