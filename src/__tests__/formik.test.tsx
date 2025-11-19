import React from 'react';
import renderer from 'react-test-renderer';
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
