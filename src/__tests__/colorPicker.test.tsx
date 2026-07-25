import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

const renderColorPicker = async () => {
  const { ColorPicker } = await import(
    'src/components/ColorPicker/ColorPicker'
  );

  return render(<ColorPicker label="Theme color" isOpen />);
};

afterEach(async () => {
  cleanup();
  vi.unstubAllGlobals();
  vi.resetModules();
});

test('renders browser color input on web', async () => {
  const { container } = await renderColorPicker();

  expect(container.querySelector('input[type="color"]')).toBeInTheDocument();
});

test('does not render browser color input in React Native runtime', async () => {
  vi.stubGlobal('navigator', {
    ...globalThis.navigator,
    product: 'ReactNative',
  });

  const { container } = await renderColorPicker();

  expect(
    container.querySelector('input[type="color"]')
  ).not.toBeInTheDocument();
});
