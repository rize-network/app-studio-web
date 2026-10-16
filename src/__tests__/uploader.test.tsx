import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Uploader component', () => {
  render(<div>Uploader</div>);
});

test('Uploader matches snapshot', () => {
  const tree = renderer.create(<div>Uploader</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
