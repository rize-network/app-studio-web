import React from 'react';
import renderer from 'react-test-renderer';
import { FieldLabel } from 'src/components/Input';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders FieldLabel component without crashing', () => {
  render(<FieldLabel>Label</FieldLabel>);
});

test('renders FieldLabel with text content', () => {
  render(<FieldLabel>Username</FieldLabel>);
  const labelElement = screen.getByText('Username');
  expect(labelElement).toBeInTheDocument();
});

test('renders FieldLabel with default size', () => {
  render(<FieldLabel>Default Size Label</FieldLabel>);
  const labelElement = screen.getByText('Default Size Label');
  expect(labelElement).toBeInTheDocument();
});

test('renders FieldLabel with size sm', () => {
  render(<FieldLabel size="sm">Small Label</FieldLabel>);
  const labelElement = screen.getByText('Small Label');
  expect(labelElement).toBeInTheDocument();
});

test('renders FieldLabel with size md', () => {
  render(<FieldLabel size="md">Medium Label</FieldLabel>);
  const labelElement = screen.getByText('Medium Label');
  expect(labelElement).toBeInTheDocument();
});

test('renders FieldLabel with size lg', () => {
  render(<FieldLabel size="lg">Large Label</FieldLabel>);
  const labelElement = screen.getByText('Large Label');
  expect(labelElement).toBeInTheDocument();
});

test('renders FieldLabel with error state', () => {
  render(<FieldLabel error={true}>Error Label</FieldLabel>);
  const labelElement = screen.getByText('Error Label');
  expect(labelElement).toBeInTheDocument();
});

test('renders FieldLabel with custom color', () => {
  render(<FieldLabel color="blue">Blue Label</FieldLabel>);
  const labelElement = screen.getByText('Blue Label');
  expect(labelElement).toBeInTheDocument();
});

test('renders FieldLabel with helperText prop', () => {
  render(<FieldLabel helperText="Additional info">Label</FieldLabel>);
  const labelElement = screen.getByText('Label');
  expect(labelElement).toBeInTheDocument();
});

test('FieldLabel with default props matches snapshot', () => {
  const tree = renderer.create(<FieldLabel>Default Label</FieldLabel>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FieldLabel with small size matches snapshot', () => {
  const tree = renderer
    .create(<FieldLabel size="sm">Small Size Label</FieldLabel>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('FieldLabel with large size matches snapshot', () => {
  const tree = renderer
    .create(<FieldLabel size="lg">Large Size Label</FieldLabel>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('FieldLabel with error state matches snapshot', () => {
  const tree = renderer
    .create(<FieldLabel error={true}>Error State Label</FieldLabel>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('FieldLabel with custom color matches snapshot', () => {
  const tree = renderer
    .create(<FieldLabel color="purple">Custom Color Label</FieldLabel>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('FieldLabel with custom views matches snapshot', () => {
  const customViews = {
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  };

  const tree = renderer
    .create(<FieldLabel views={customViews}>Styled Label</FieldLabel>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
