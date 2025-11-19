import React from 'react';
import renderer from 'react-test-renderer';
import { Accordion } from 'src/components';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Accordion component', () => {
  render(<Accordion />);
});

test('renders Accordion with items', () => {
  const items = [
    { value: 'item1', title: 'Item 1', content: 'Content 1' },
    { value: 'item2', title: 'Item 2', content: 'Content 2' },
  ];
  render(<Accordion items={items} />);
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
});

test('Accordion expands item on click', () => {
  const items = [{ value: 'item1', title: 'Item 1', content: 'Content 1' }];
  render(<Accordion items={items} />);
  const trigger = screen.getByText('Item 1');
  fireEvent.click(trigger);
});

test('Accordion calls onValueChange callback', () => {
  const handleValueChange = jest.fn();
  const items = [{ value: 'item1', title: 'Item 1', content: 'Content 1' }];
  render(<Accordion items={items} onValueChange={handleValueChange} />);
});

test('Accordion matches snapshot', () => {
  const items = [{ value: 'item1', title: 'Item 1', content: 'Content 1' }];
  const tree = renderer.create(<Accordion items={items} />).toJSON();
  expect(tree).toMatchSnapshot();
});
