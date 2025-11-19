import React from 'react';
import renderer from 'react-test-renderer';
import { WarningIcon } from 'src/components/Icon/Icon';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Icon component', () => {
  render(<WarningIcon size={24} />);
});

test('Icon with different sizes', () => {
  render(<WarningIcon size={32} />);
});

test('Icon matches snapshot', () => {
  const tree = renderer.create(<WarningIcon size={24} />).toJSON();
  expect(tree).toMatchSnapshot();
});
