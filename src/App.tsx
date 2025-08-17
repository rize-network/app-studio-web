import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ComponentRouter } from 'src/routes/routes';
import { View, Text } from 'app-studio';

export const App: React.FC = () => {
  const location = useLocation();
  return (
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
      <Routes location={location}>
        {ComponentRouter.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default App;
