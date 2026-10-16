import React from 'react';

export interface RouteConfig {
  // Path pattern. Supports `:param` segments, e.g. '/user/:id'.
  path: string;
  component: React.ComponentType<any>;
}

export type RouteList =
  | RouteConfig[]
  | Record<string, React.ComponentType<any>>;

export interface RouterProps {
  // Routes as an array of `{ path, component }` or a `{ path: Component }` map.
  routes: RouteList;
  // Path to start at on mount (defaults to the store's current path).
  initialPath?: string;
  // Rendered when no route matches.
  notFound?: React.ComponentType<any>;
  /**
   * Reflect navigation to the browser URL and honour the browser Back button
   * (web only, default false). Native always honours the hardware Back button.
   */
  syncBrowserHistory?: boolean;
}
