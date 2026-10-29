import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { StatusIndicator } from 'src/components';
import { DesignSystemProvider, designSystemConfigList } from 'src/design-system';

afterEach(() => {
  cleanup();
});

test('renders StatusIndicator component', () => {
  render(<StatusIndicator label="Active" status="success" />);
  // `status` is the real ARIA role — "status-indicator" never was one.
  const indicator = screen.getByRole('status');
  const label = screen.getByText('Active');
  expect(indicator).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('applies correct color for error status', () => {
  const { container } = render(<StatusIndicator status="error" />);
  const dot = container.querySelector('[data-role="status-dot"]');
  expect(dot).toHaveStyle({ backgroundColor: 'color-red-500' });
});

// composer.6: the dot keeps its variant colour; no shipped design-system config sets it any more
// (each one used to paint every dot theme-success, whatever its status).
test('no shipped design-system config overrides the status dot colour', () => {
  const offenders = designSystemConfigList
    .filter((config: any) => config?.components?.status?.views?.indicator?.backgroundColor != null)
    .map((config: any) => config?.metadata?.id);
  expect(offenders).toEqual([]);
});

test('inside the default design system, an error dot keeps its variant colour', () => {
  const { container } = render(
    <DesignSystemProvider configId="default">
      <StatusIndicator status="error" />
    </DesignSystemProvider>
  );
  const dot = container.querySelector('[data-role="status-dot"]');
  expect(dot).toHaveStyle({ backgroundColor: 'color-red-500' });
});
