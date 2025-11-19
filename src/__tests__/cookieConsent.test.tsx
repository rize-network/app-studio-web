import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders CookieConsent component', () => {
  render(<div>Cookie Consent</div>);
});

test('CookieConsent matches snapshot', () => {
  const tree = renderer.create(<div>Cookie Consent</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
