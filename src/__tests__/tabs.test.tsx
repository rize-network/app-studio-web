import React from 'react';
import renderer from './actRenderer.test-utils';
import { Tabs } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('only the active tab content is mounted by default', () => {
  const tabs = [
    { title: 'One', value: 'one', content: 'First pane' },
    { title: 'Two', value: 'two', content: 'Second pane' },
  ];
  render(<Tabs tabs={tabs} />);
  expect(screen.getByText('First pane')).toBeInTheDocument();
  expect(screen.queryByText('Second pane')).not.toBeInTheDocument();
});

test('keepMounted mounts every pane and hides the inactive ones', () => {
  const tabs = [
    { title: 'One', value: 'one', content: 'First pane' },
    { title: 'Two', value: 'two', content: 'Second pane' },
  ];
  render(<Tabs tabs={tabs} keepMounted />);
  expect(screen.getByText('First pane')).toBeVisible();
  const second = screen.getByText('Second pane');
  expect(second).toBeInTheDocument();
  expect(second).not.toBeVisible();
});

test('renders Tabs component', () => {
  const tabs = [{ value: 'tab1', label: 'Tab 1', content: 'Content 1' }];
  const { container } = render(<Tabs tabs={tabs} />);
  expect(container).toBeInTheDocument();
});

test('Tabs matches snapshot', () => {
  const tabs = [{ value: 'tab1', label: 'Tab 1', content: 'Content 1' }];
  const tree = renderer.create(<Tabs tabs={tabs} />).toJSON();
  expect(tree).toMatchSnapshot();
});
