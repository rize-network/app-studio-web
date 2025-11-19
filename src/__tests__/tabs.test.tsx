import React from 'react';
import renderer from 'react-test-renderer';
import { Tabs } from 'src/components';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Tabs component', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
  ];
  const { container } = render(<Tabs tabs={tabs} />);
  expect(container).toBeInTheDocument();
});

test('Tabs matches snapshot', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
  ];
  const tree = renderer.create(<Tabs tabs={tabs} />).toJSON();
  expect(tree).toMatchSnapshot();
});
