/**
 * Router (native).
 *
 * Renders the matched route from the shared history store and wires the Android
 * hardware Back button to `history.back()` — returning the app to the previous
 * screen, or letting the OS exit the app when already at the root (the same
 * behavior as the original app-demo RouterLayout's `useBackHandler`).
 */
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useMount } from 'app-studio';
import { RouterOutlet } from './Router.match';
import { useHistory } from './useHistory';
import { RouterProps } from './Router.types';

export const Router: React.FC<RouterProps> = ({
  routes,
  notFound,
  initialPath,
}) => {
  const { back, reset } = useHistory();

  useMount(() => {
    if (initialPath) reset(initialPath);
  });

  useEffect(() => {
    // Returning true tells Android we handled Back; false lets it exit the app.
    const subscription = BackHandler.addEventListener('hardwareBackPress', () =>
      back()
    );
    return () => subscription.remove();
  }, [back]);

  return <RouterOutlet routes={routes} notFound={notFound} />;
};
