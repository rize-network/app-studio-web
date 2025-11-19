import React from 'react';
import renderer from 'react-test-renderer';
import { Toast } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Toast component', () => {
  render(<Toast title="Test Toast" />);
});

test('renders Toast with title', () => {
  render(<Toast title="Success" />);
  expect(screen.getByText('Success')).toBeInTheDocument();
});

test('renders Toast with description', () => {
  render(<Toast title="Info" description="This is info" />);
  expect(screen.getByText('This is info')).toBeInTheDocument();
});

test('renders Toast with success variant', () => {
  render(<Toast title="Success" variant="success" />);
  expect(screen.getByText('Success')).toBeInTheDocument();
});

test('renders Toast with error variant', () => {
  render(<Toast title="Error" variant="error" />);
  expect(screen.getByText('Error')).toBeInTheDocument();
});

test('Toast matches snapshot', () => {
  const tree = renderer.create(
    <Toast title="Test" description="Description" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
