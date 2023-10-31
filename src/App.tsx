import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ComponentRouter } from 'src/routes/routes';

export const App: React.FC = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      {ComponentRouter.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default App;
