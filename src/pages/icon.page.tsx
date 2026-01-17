import { Text, View, Vertical, Horizontal } from 'app-studio';
import React, { useState, useMemo } from 'react';
import * as Icons from 'src/components/Icon/Icon';

export const IconPage = () => {
  const [search, setSearch] = useState('');

  const iconList = useMemo(() => {
    return Object.keys(Icons).filter(
      (name) => name.endsWith('Icon') && name !== 'Icon'
    );
  }, []);

  const filteredIcons = iconList.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Vertical overflowY="auto" height="100%">
      <Vertical padding={40} gap={40}>
        <Vertical gap={10}>
          <Text fontSize={32} fontWeight={700}>
            Icon Library
          </Text>
          <Text color="theme-text">
            Explore the comprehensive set of icons available in App Studio.
          </Text>
        </Vertical>

        <View
          component="input"
          placeholder="Search icons..."
          padding={12}
          borderRadius={8}
          border="1px solid"
          borderColor="theme-border"
          backgroundColor="theme-input"
          color="theme-text"
          outline="none"
          maxWidth={400}
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />

        <Vertical gap={20}>
          <Text fontSize={20} fontWeight={600}>
            Dynamic Icon Usage
          </Text>
          <Horizontal gap={20} alignItems="center">
            <Icons.Icon name="activity" widthHeight={32} color="red" />
            <Icons.Icon name="aperture" widthHeight={32} color="green" />
            <Icons.Icon name="anchor" widthHeight={32} color="blue" />
            <Text color="theme-text">
              {`<Icon name="..." /> can render any Lucide icon dynamically.`}
            </Text>
          </Horizontal>
        </Vertical>

        <Vertical gap={20}>
          <Text fontSize={20} fontWeight={600}>
            Named Exports ({filteredIcons.length})
          </Text>
          <View
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(140px, 1fr))"
            gap={16}
          >
            {filteredIcons.map((name) => {
              const IconComponent = Icons[name as keyof typeof Icons];
              return (
                <View
                  key={name}
                  padding={16}
                  borderRadius={12}
                  border="1px solid"
                  borderColor="theme-primary"
                  alignItems="center"
                  justifyContent="center"
                  gap={12}
                  display="flex"
                  flexDirection="column"
                  hoverStyle={{
                    borderColor: 'theme-primary',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                  transition="all 0.2s ease"
                >
                  {/* @ts-ignore - Generic component rendering */}
                  <IconComponent widthHeight={24} />
                  <Text fontSize={11} textAlign="center" wordBreak="break-word">
                    {name}
                  </Text>
                </View>
              );
            })}
          </View>
        </Vertical>
      </Vertical>
    </Vertical>
  );
};

export default IconPage;
