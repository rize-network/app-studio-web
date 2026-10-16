/**
 * Drop-in replacement for `react-test-renderer` that commits inside `act()`.
 *
 * React 19 renders through a concurrent root, so the tree is not committed by
 * the time `renderer.create(...)` returns: `.toJSON()` hands back `null` for
 * everything — including a bare `<textarea />`. That turned every
 * `toMatchSnapshot` test in this directory into a failure that looked like a
 * component regression but was purely a renderer-lifecycle change.
 *
 * Wrapping the create in `act()` flushes the commit, which is what these
 * snapshot tests always assumed. Import this instead of 'react-test-renderer';
 * the `create` API is identical.
 */
import type { ReactElement } from 'react';
import renderer, { act } from 'react-test-renderer';
import type {
  ReactTestRenderer,
  TestRendererOptions,
} from 'react-test-renderer';

export const create = (
  element: ReactElement,
  options?: TestRendererOptions
): ReactTestRenderer => {
  let root: ReactTestRenderer | undefined;
  act(() => {
    root = renderer.create(element, options);
  });
  // `act` runs its callback synchronously, so `root` is always assigned here.
  return root as ReactTestRenderer;
};

export default { create };
