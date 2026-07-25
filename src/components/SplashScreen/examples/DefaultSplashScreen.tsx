import React, { useState } from 'react';
import { Text, View } from 'app-studio';
import { Button, SplashScreen } from '../..';

/**
 * Demonstrates the controlled `isLoaded` flow inside a bordered frame. "Reload"
 * re-shows the splash; it fades out automatically after ~1.2s.
 */
export const DefaultSplashScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [run, setRun] = useState(0);

  const start = () => {
    setLoaded(false);
    setRun((n) => n + 1);
    setTimeout(() => setLoaded(true), 1200);
  };

  return (
    <View
      position="relative"
      height={360}
      width="100%"
      maxWidth={360}
      borderRadius={16}
      overflow="hidden"
      borderWidth={1}
      borderStyle="solid"
      borderColor="color-gray-200"
    >
      <View
        flex={1}
        padding={16}
        gap={12}
        alignItems="center"
        justifyContent="center"
      >
        <Text>App content is ready.</Text>
        <Button onClick={start}>Reload splash</Button>
      </View>
      {run > 0 && (
        <SplashScreen
          key={run}
          isLoaded={loaded}
          logo={
            <View
              width={96}
              height={96}
              borderRadius={24}
              backgroundColor="color-blue-500"
            />
          }
        />
      )}
    </View>
  );
};
