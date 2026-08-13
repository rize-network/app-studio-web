import React from 'react';
import renderer from './actRenderer.test-utils';
import { Alert } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders default Alert without a live-region role', () => {
  const { container } = render(<Alert />);
  expect(container.firstChild).not.toHaveAttribute('role');
});

test('renders Alert with title', () => {
  render(<Alert title="Test Title" />);
  const titleElement = screen.getByText('Test Title');
  expect(titleElement).toBeInTheDocument();
});

test('renders Alert with description', () => {
  render(<Alert title="Test" description="Test Description" />);
  const descriptionElement = screen.getByText('Test Description');
  expect(descriptionElement).toBeInTheDocument();
});

test('renders Alert with children', () => {
  render(<Alert title="Test">Alert Content</Alert>);
  const contentElement = screen.getByText('Alert Content');
  expect(contentElement).toBeInTheDocument();
});

test('renders info Alert with status role', () => {
  render(<Alert title="Info Alert" variant="info" />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('renders success Alert with status role', () => {
  render(<Alert title="Success Alert" variant="success" />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('renders error Alert with alert role', () => {
  render(<Alert title="Error Alert" variant="error" />);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('renders warning Alert with alert role', () => {
  render(<Alert title="Warning Alert" variant="warning" />);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('allows an explicit role to override the variant default', () => {
  render(<Alert title="Polite error" variant="error" role="status" />);
  expect(screen.getByRole('status')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('Alert with warning variant matches snapshot', () => {
  const tree = renderer
    .create(
      <Alert
        title="Warning"
        description="This is a warning"
        variant="warning"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert with info variant matches snapshot', () => {
  const tree = renderer
    .create(<Alert title="Info" description="This is info" variant="info" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert with success variant matches snapshot', () => {
  const tree = renderer
    .create(
      <Alert title="Success" description="This is success" variant="success" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert with error variant matches snapshot', () => {
  const tree = renderer
    .create(
      <Alert title="Error" description="This is an error" variant="error" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
