import React, { Suspense } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { ComponentRouter } from 'src/routes/routes';
import { View, Text } from 'app-studio';
import PageMetadata from './pages/PageMetadata';

export const App: React.FC = () => {
  const location = useLocation();
  const content = useRoutes(ComponentRouter, location);

  return (
    <>
      <PageMetadata />
      <Suspense
        fallback={
          <View
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text>Loading...</Text>
          </View>
        }
      >
        {content}
      </Suspense>
    </>
  );
};

export default App;
