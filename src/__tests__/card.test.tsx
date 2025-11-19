import React from 'react';
import renderer from 'react-test-renderer';
import { Card } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Card component without crashing', () => {
  render(<Card>Card Content</Card>);
});

test('renders Card with children', () => {
  render(<Card>Test Content</Card>);
  const contentElement = screen.getByText('Test Content');
  expect(contentElement).toBeInTheDocument();
});

test('renders Card with header and footer', () => {
  render(
    <Card header={<div>Header</div>} footer={<div>Footer</div>}>
      Content
    </Card>
  );
  const headerElement = screen.getByText('Header');
  const footerElement = screen.getByText('Footer');
  expect(headerElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();
});

test('renders Card with Card.Header compound component', () => {
  render(
    <Card>
      <Card.Header>Header Content</Card.Header>
      <Card.Content>Body Content</Card.Content>
    </Card>
  );
  const headerElement = screen.getByText('Header Content');
  expect(headerElement).toBeInTheDocument();
});

test('renders Card with Card.Content compound component', () => {
  render(
    <Card>
      <Card.Content>Body Content</Card.Content>
    </Card>
  );
  const contentElement = screen.getByText('Body Content');
  expect(contentElement).toBeInTheDocument();
});

test('renders Card with Card.Footer compound component', () => {
  render(
    <Card>
      <Card.Footer>Footer Content</Card.Footer>
    </Card>
  );
  const footerElement = screen.getByText('Footer Content');
  expect(footerElement).toBeInTheDocument();
});

test('renders Card with all compound components', () => {
  render(
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Content>Content</Card.Content>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  );
  expect(screen.getByText('Header')).toBeInTheDocument();
  expect(screen.getByText('Content')).toBeInTheDocument();
  expect(screen.getByText('Footer')).toBeInTheDocument();
});

test('renders Card with isFullWidth prop', () => {
  const { container } = render(<Card isFullWidth>Full Width Card</Card>);
  expect(screen.getByText('Full Width Card')).toBeInTheDocument();
});

test('renders Card with different sizes', () => {
  render(<Card size="sm">Small Card</Card>);
  expect(screen.getByText('Small Card')).toBeInTheDocument();
});

test('renders Card with different shapes', () => {
  render(<Card shape="rounded">Rounded Card</Card>);
  expect(screen.getByText('Rounded Card')).toBeInTheDocument();
});

test('renders Card with square shape', () => {
  render(<Card shape="square">Square Card</Card>);
  expect(screen.getByText('Square Card')).toBeInTheDocument();
});

test('renders Card with different variants', () => {
  render(<Card variant="outline">Outline Card</Card>);
  expect(screen.getByText('Outline Card')).toBeInTheDocument();
});

test('Card with default props matches snapshot', () => {
  const tree = renderer.create(<Card>Card Content</Card>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card with compound components matches snapshot', () => {
  const tree = renderer
    .create(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card with header and footer matches snapshot', () => {
  const tree = renderer
    .create(
      <Card header={<div>Header</div>} footer={<div>Footer</div>}>
        Content
      </Card>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card with custom views matches snapshot', () => {
  const customViews = {
    container: { backgroundColor: '#f5f5f5' },
    header: { paddingBottom: '16px' },
  };
  const tree = renderer
    .create(
      <Card views={customViews} header={<div>Header</div>}>
        Content
      </Card>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
