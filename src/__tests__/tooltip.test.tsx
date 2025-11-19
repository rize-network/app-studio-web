import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Tooltip component', () => {
  render(
    <div title="Tooltip text">
      Hover me
    </div>
  );
});

test('Tooltip with content', () => {
  render(
    <div title="Help text">
      Button
    </div>
  );
  expect(screen.getByText('Button')).toBeInTheDocument();
});

test('Tooltip matches snapshot', () => {
  const tree = renderer.create(
    <div title="Tooltip">Content</div>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
