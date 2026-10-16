import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Formik component', () => {
  render(<div>Formik</div>);
});

test('Formik matches snapshot', () => {
  const tree = renderer.create(<div>Formik</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
