/**
 * Router (web).
 *
 * Renders the matched route from the shared history store and, when
 * `syncBrowserHistory` is set, mirrors navigation to the address bar and maps
 * the browser Back/Forward buttons onto the store. The native build
 * (`Router.native.tsx`) instead bridges the Android hardware Back button.
 */
import React, { useEffect, useRef } from 'react';
import { useMount } from 'app-studio';
import { RouterOutlet } from './Router.match';
import { useHistory } from './useHistory';
import { RouterProps } from './Router.types';

export const Router: React.FC<RouterProps> = ({
  routes,
  notFound,
  initialPath,
  syncBrowserHistory = false,
}) => {
  const { path, push, back, reset } = useHistory();
  // Guards against feedback loops between popstate → store → pushState.
  const suppressPush = useRef(false);

  useMount(() => {
    if (initialPath) reset(initialPath);
  });

  // Reflect store changes to the URL bar.
  useEffect(() => {
    if (!syncBrowserHistory || typeof window === 'undefined') return;
    if (suppressPush.current) {
      suppressPush.current = false;
      return;
    }
    try {
      window.history.pushState({ path }, '', path);
    } catch {
      // history API unavailable (e.g. some sandboxes) — ignore
    }
  }, [path, syncBrowserHistory]);

  // Map the browser Back button onto the store.
  useEffect(() => {
    if (!syncBrowserHistory || typeof window === 'undefined') return;
    const onPop = () => {
      suppressPush.current = true;
      const moved = back();
      if (!moved) suppressPush.current = false;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [syncBrowserHistory, back, push]);

  return <RouterOutlet routes={routes} notFound={notFound} />;
};
