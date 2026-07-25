import { useRouterStore } from './Router.store';

/**
 * Read the current route and drive navigation from a component.
 *
 * ```tsx
 * const { path, params, push, back, canGoBack } = useHistory();
 * push('/profile/42');
 * ```
 */
export const useHistory = () => {
  const stack = useRouterStore((state) => state.stack);
  const index = useRouterStore((state) => state.index);
  const push = useRouterStore((state) => state.push);
  const replace = useRouterStore((state) => state.replace);
  const back = useRouterStore((state) => state.back);
  const go = useRouterStore((state) => state.go);
  const reset = useRouterStore((state) => state.reset);

  const current = stack[index] || { path: '/', params: {} };

  return {
    path: current.path,
    params: current.params,
    stack,
    index,
    canGoBack: index > 0,
    push,
    replace,
    back,
    go,
    reset,
    // Alias so `navigate(...)` reads naturally in components.
    navigate: push,
  };
};
