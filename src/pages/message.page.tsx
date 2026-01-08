import React from 'react';
import { View, Text, Vertical, useTheme } from 'app-studio';
import {
  ActionDemo,
  DefaultDemo,
  IsClosableDemo,
  ShowIconDemo,
  StylesDemo,
  SubtitleDemo,
  TimeoutDemo,
  TitleDemo,
  VariantDemo,
} from '../components/Message/examples';
import { MessageLayout } from '../components/Message/Message/Message.layout';

const MessagePage = () => {
  const { themeMode } = useTheme();

  const sections = {
    'Default Message': <DefaultDemo />,
    'Variants & Status': <VariantDemo />,
    'Titles & Subtitles': (
      <Vertical gap={16}>
        <TitleDemo />
        <SubtitleDemo />
      </Vertical>
    ),
    'Icons & Actions': (
      <Vertical gap={16}>
        <ShowIconDemo />
        <ActionDemo />
      </Vertical>
    ),
    Behaviors: (
      <Vertical gap={16}>
        <IsClosableDemo />
        <TimeoutDemo />
      </Vertical>
    ),
    'Custom Styling': <StylesDemo />,
  };

  return (
    <View padding={20} backgroundColor="theme.background" minHeight="100vh">
      <View gap={32} display="flex" flexDirection="column">
        {Object.entries(sections).map(([title, content]) => (
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
      <View
        marginTop={40}
        padding={20}
        backgroundColor={
          themeMode === 'light' ? 'color.gray.50' : 'color.gray.900'
        }
        borderRadius={12}
      >
        <Text
          fontSize={18}
          fontWeight="bold"
          marginBottom={16}
          color="theme.primary"
        >
          Layout Preview
        </Text>
        <MessageLayout />
      </View>
    </View>
  );
};

export default MessagePage;
