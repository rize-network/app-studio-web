import { Vertical } from 'app-studio';
import React from 'react';
import { Text } from 'src/components';
import {
  DefaultDrawer,
  DrawerPlacements,
  DrawerSizes,
} from 'src/components/Drawer/Examples';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Vertical
    gap={8}
    paddingBottom={24}
    borderBottomWidth="1px"
    borderBottomColor="color.gray.200"
  >
    <Text as="h3" fontWeight="bold" fontSize="lg">
      {title}
    </Text>
    {children}
  </Vertical>
);

export const DrawerPage = () => (
  <Vertical gap={24} padding={24}>
    <Text as="h1" fontWeight="bold" fontSize="2xl">
      Drawer Examples
    </Text>

    <Section title="Default">
      <DefaultDrawer />
    </Section>

    <Section title="Placements">
      <DrawerPlacements />
    </Section>

    <Section title="Sizes">
      <DrawerSizes />
    </Section>
  </Vertical>
);

export default DrawerPage;
