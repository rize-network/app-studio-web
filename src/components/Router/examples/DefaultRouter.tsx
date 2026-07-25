import React from 'react';
import { Text, Vertical, Horizontal, View } from 'app-studio';
import { Button, Router, useHistory } from '../..';

const Home = () => {
  const { push } = useHistory();
  return (
    <Vertical gap={12} padding={16}>
      <Text fontWeight="bold">Home</Text>
      <Button onClick={() => push('/profile/42')}>Go to profile 42</Button>
    </Vertical>
  );
};

const Profile = ({ id }: { id?: string }) => {
  const { back, canGoBack } = useHistory();
  return (
    <Vertical gap={12} padding={16}>
      <Text fontWeight="bold">Profile #{id}</Text>
      <Button variant="outline" isDisabled={!canGoBack} onClick={() => back()}>
        Back
      </Button>
    </Vertical>
  );
};

/**
 * A tiny two-screen app driven by the shared history store. On native the
 * Android hardware Back button maps to `back()` automatically.
 */
export const DefaultRouter = () => (
  <View
    height={240}
    width="100%"
    maxWidth={360}
    borderRadius={16}
    overflow="hidden"
    borderWidth={1}
    borderStyle="solid"
    borderColor="color-gray-200"
  >
    <Horizontal padding={8} backgroundColor="color-gray-100">
      <Text color="color-gray-500">Mini Router demo</Text>
    </Horizontal>
    <Router
      initialPath="/"
      routes={[
        { path: '/', component: Home },
        { path: '/profile/:id', component: Profile },
      ]}
    />
  </View>
);
