import React from 'react';
import renderer from 'react-test-renderer';
import { Alert } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Alert component without crashing', () => {
  render(<Alert />);
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

test('renders Alert with info variant', () => {
  render(<Alert title="Info Alert" variant="info" />);
  const alertElement = screen.getByText('Info Alert').closest('div');
  expect(alertElement).toBeInTheDocument();
});

test('renders Alert with success variant', () => {
  render(<Alert title="Success Alert" variant="success" />);
  const alertElement = screen.getByText('Success Alert').closest('div');
  expect(alertElement).toBeInTheDocument();
});

test('renders Alert with error variant', () => {
  render(<Alert title="Error Alert" variant="error" />);
  const alertElement = screen.getByText('Error Alert').closest('div');
  expect(alertElement).toBeInTheDocument();
});

test('Alert with warning variant matches snapshot', () => {
  const tree = renderer.create(<Alert title="Warning" description="This is a warning" variant="warning" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert with info variant matches snapshot', () => {
  const tree = renderer.create(<Alert title="Info" description="This is info" variant="info" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert with success variant matches snapshot', () => {
  const tree = renderer.create(<Alert title="Success" description="This is success" variant="success" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert with error variant matches snapshot', () => {
  const tree = renderer.create(<Alert title="Error" description="This is an error" variant="error" />).toJSON();
  expect(tree).toMatchSnapshot();
});
