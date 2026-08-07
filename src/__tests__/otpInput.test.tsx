import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders OTPInput component', () => {
  render(<input type="number" placeholder="OTP" />);
});

test('OTPInput matches snapshot', () => {
  const tree = renderer
    .create(<input type="number" placeholder="OTP" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
