import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { StatusIndicator } from 'src/components';

afterEach(() => {
  cleanup();
});

test('renders StatusIndicator component', () => {
  render(<StatusIndicator label="Active" status="success" />);
  const indicator = screen.getByRole('status-indicator');
  const label = screen.getByText('Active');
  expect(indicator).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('applies correct color for error status', () => {
  render(<StatusIndicator status="error" />);
  const dot = screen.getByRole('status-dot');
  expect(dot).toHaveStyle({ backgroundColor: 'color-red-500' });
});
