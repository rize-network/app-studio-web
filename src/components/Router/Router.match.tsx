import React from 'react';
import { useHistory } from './useHistory';
import { RouteConfig, RouteList, RouterProps } from './Router.types';

/**
 * Match a `:param`-style pattern against a concrete path. Returns the parsed
 * params on success, or null when it doesn't match.
 */
export const matchPath = (
  pattern: string,
  path: string
): Record<string, string> | null => {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const seg = patternParts[i];
    if (seg.startsWith(':')) {
      params[seg.slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (seg !== pathParts[i]) {
      return null;
    }
  }
  return params;
};

const toList = (routes: RouteList): RouteConfig[] =>
  Array.isArray(routes)
    ? routes
    : Object.entries(routes).map(([path, component]) => ({ path, component }));

/**
 * RouterOutlet — the platform-agnostic render half of the Router. It reads the
 * current path from the history store and renders the first matching route,
 * passing both the route params and the entry's params to the screen. Both the
 * web and native `Router` wrap this; they differ only in how they bridge to the
 * platform's Back affordance.
 */
export const RouterOutlet: React.FC<
  Pick<RouterProps, 'routes' | 'notFound'>
> = ({ routes, notFound: NotFound }) => {
  const { path, params } = useHistory();
  for (const route of toList(routes)) {
    const matched = matchPath(route.path, path);
    if (matched) {
      const Screen = route.component;
      return <Screen {...params} {...matched} />;
    }
  }
  return NotFound ? <NotFound /> : null;
};
