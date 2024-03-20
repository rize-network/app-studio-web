import React from 'react';
import renderer from 'react-test-renderer';
import { AspectRatio, View } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders AspectRatio component', () => {
  render(<AspectRatio role="textbox" />);
  const AspectRatioElement = screen.getByRole('textbox');
  expect(AspectRatioElement).toBeInTheDocument();
});

test('AspectRatio to match snapshot', () => {
  const tree = renderer
    .create(
      <AspectRatio ratio={4 / 3}>
        <View height="100px" />
      </AspectRatio>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
