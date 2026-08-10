import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { StatusIndicator } from 'src/components';

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
